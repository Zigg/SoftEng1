/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable block-spacing */
/* eslint-disable semi */
/* eslint-disable brace-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */

const admin = require("firebase-admin");
const db = admin.firestore();
const realtimeDb = admin.database();

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const cartCollectionRef = db.collection("cart");

const checkoutSessionSchema = require("../models/checkoutModel");
// TODO: Create a checkout function that will handle the payment intent
// TODO: Create a createCheckoutSession function that will handle the checkout session
// TODO: Create a function that will handle the webhook for the checkout session
// TODO: Create a function that will handle the webhook for the payment intent
// TODO: Create a function that will handle the webhook for the payment method

const checkoutTestRouteServer = (_req, res, next) => {
  return res.send("Inside the checkout router");
};

// FIXME: Why the fuck is sig undefined???
// FIXME: Webhook payload
const webhookEventHandler = async (req, res) => {
  // Parse the webhook request body and extract the relevant information
  const sig = req.headers["stripe-signature"]; // The signature header from the webhook request
  const rawBody = req.rawBody; // The raw body of the webhook request as a buffer
  let event;
  // Validate the webhook request using the stripe.webhooks.constructEvent method
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (error) {
    // If there is an error, return a 400 Bad Request response with the error message
    console.error(`Webhook Error: ${error.message}`);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
  // Implement the logic for the webhook event based on the event type and the event data
  const paymentIntent = event.data.object
  const charge = event.data.object;
  const session = event.data.object;

  switch (event.type) {
    case "charge.succeeded":
      // Get the Charge object from the event data
      // Update your Realtime Database with the charge ID and the amount
      // TODO: Replace this with your actual Realtime Database update logic
      await realtimeDb.ref("charges_webhook").child(charge.id).set({
        chargeId: charge.id,
        amount: charge.amount,
      });
      // Perform any other action you want for a successful charge
      // TODO: Replace this with your actual action logic
      // console.log(charge.receipt_email, "Your payment was successful", "Here is your receipt");
      break;
    case "payment_intent.created":
      // Get the Payment Intent object from the event data
      // Update your Realtime Database with the payment intent ID and the amount
      // TODO: Replace this with your actual Realtime Database update logic
      await realtimeDb.ref("payment_intents_webhook").child(paymentIntent.id).set({
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
      });
      // Perform any other action you want for a created payment intent
      // TODO: Replace this with your actual action logic
      // console.log(paymentIntent.receipt_email, "Your payment is being processed", "We will notify you once your payment is confirmed");
      break;
    case "charge.failed":
      // Get the Charge object from the event data
      // Update your Realtime Database with the charge status and the paid flag
      // TODO: Replace this with your actual Realtime Database update logic
      await realtimeDb.ref("charges_webhook").child(charge.id).update({
        chargeStatus: charge.status,
        paid: false,
      });
      // Perform any other action you want for a failed charge
      // TODO: Replace this with your actual action logic
      console.log(charge.receipt_email, "Your payment failed", "Please try again or contact us for support");
      break;
    case "payment_intent.succeeded":
      // const paymentIntent = event.data.object;
      // Get the Payment Intent object from the event data
      // Update your Realtime Database with the payment status and the paid flag
      // TODO: Replace this with your actual Realtime Database update logic
      await realtimeDb.ref("payment_intents_webhook").child(paymentIntent.id).update({
        paymentStatus: paymentIntent.status,
        paid: paymentIntent.status === "succeeded",
      });
      // Perform any other action you want for a successful payment intent
      break;
    case "payment_intent.payment_failed":
      // Get the Payment Intent object from the event data
      const failedPaymentIntent = event.data.object;
      // Update your Realtime Database with the payment status and the paid flag
      // TODO: Replace this with your actual Realtime Database update logic
      await realtimeDb.ref("payment_intents_webhook").child(failedPaymentIntent.id).update({
        paymentStatus: failedPaymentIntent.status,
        paid: false,
      });
      break;

    case "product.created":

      break;
    case "price.created":

      break;
    case "checkout.session.completed":
      // Get the Checkout Session object from the event data
      // Update your Realtime Database with the payment status, the payment intent ID, and the paid flag
      // TODO: Replace this with your actual Realtime Database update logic
      await realtimeDb.ref("checkout_sessions_webhook").child(session.id).update({
        paymentStatus: session.payment_status,
        paymentIntentId: session.payment_intent,
        paid: session.payment_status === "paid",
      });
      // Send a confirmation email to the customer or perform any other action you want
      // TODO: Replace this with your actual email or action logic
      // TODO: Replace all session objects(well not all but what is necessary to) with the value from the response body
      console.log(session.customer_email, "Your payment was successful", "Thank you for your purchase");
      break;
    // TODO: This must come from the cart
    // case "product.created":
    //   // Get the Product object from the event data
    //   const product = event.data.object;
    //   // Add the product to your Realtime Database
    //   // Retrieve the product from the Firestore product collection using the productId
    //   const productId = product.id; // Derive the productId from the response body
    //   req.rawBody.id = productId
    //   const productRef = db.collection("products").doc(productId);
    //   const productSnapshot = await productRef.get();
    //   if (productSnapshot.exists) {
    //     const productData = productSnapshot.data();
    //     await realtimeDb.ref("products").child(product.id).set(product);
    //     // Send a confirmation email to the customer or perform any other action you want
    //     console.log(productData.name, "was added to the database");
    //   } else {
    //     console.log("Product not found in Firestore");
    //   }
    //   break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  res.status(200).send({ received: true, event });
};

// TODO:
// TODO: Assign the total price to the payment intent, based on the cart doc
// FIXME:
// TODO: Create a check to figure out if there is already an active checkout session
const createCheckoutIntentServer = async (req, res) => {
  // Parse the request body and extract the relevant information
  const { sessionId, totalPrice } = req.body;

  try {
    // Retrieve the checkout session from the session ID
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log(session, "Session Data")

    // Check if the checkout session is already paid
    if (session && session.payment_status === "paid") {
      console.log("Checkout session is already paid.");
      res.status(409).send({ success: true, id: session.payment_intent, msg: "Checkout session is already paid for" });
      return;
    }

    // Check if the checkout session already has a payment intent
    if (session && session.payment_intent) {
      console.log("Checkout session already has a payment intent.");
      res.status(409).send({ success: true, id: session.payment_intent, msg: "Checkout session already has a payment intent" });
      return;
    }

    // Check if the checkout session already has a payment intent ID
    if (session && session.payment_intent_id) {
      console.log("Checkout session already has a payment intent ID.");
      res.status(409).send({ success: true, id: session.payment_intent_id, msg: "Checkout session already has a payment intent ID" });
      return;
    }

    // Check if the checkout session is already completed
    if (session && session.payment_status === "completed") {
      console.log("Checkout session is already completed.");
      res.status(409).send({ success: true, id: session.payment_intent, msg: "Checkout session is already completed" });
      return;
    }

    const customerId = session.customer;
    const customer = await stripe.customers.retrieve(customerId);
    const { email, name } = customer;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: "usd",
      description: "(created by Stripe CLI)",
      payment_method_types: ["card"],
      customer: customerId,
      metadata: {
        email,
        name
      }
    });

    console.log("Checkout payment intent created successfully. Intent ID: ", paymentIntent.id);

    // Check if totalPrice is greater than or equal to the session amount_total
    if (totalPrice >= session.amount_total) {
      session.payment_status = "paid";
      session.payment_intent = paymentIntent.id;

      await stripe.checkout.sessions.update(sessionId, {
        payment_status: "paid",
        payment_intent: paymentIntent.id
      });

      await realtimeDb.ref(`checkoutSessions/${sessionId}`).update({
        session: {
          payment_status: paymentIntent.status,
          payment_intent: paymentIntent.id,
        },
        paymentIntent: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          description: paymentIntent.description,
          metadata: paymentIntent.metadata,
        },
      });


      res.status(200).send({ success: true, id: paymentIntent.id });
    } else {
      res.status(400).send({ success: false, msg: "Not enough funds" })
    }
  } catch (error) {
    console.error(`Error creating checkout payment intent: ${error.message}`);
    res.status(500).send(error.message);
  }
};


// TODO:
// TODO: Assign the total price to the checkout session, based on the cart doc, and the items, majority of the items from the request body must come from the session object
// TODO: This works already, but the line items must come from the cart
// TODO: Complete the check from the checkoutSchema
// TODO: Create cart middleware to check if the user is the owner of the cart
const createCheckoutSessionServer = async (req, res) => {
  // Parse the request body and extract the relevant information
  const { userId, cartId } = req.body;
  // Validate the request body using your checkout session schema
  const user = await admin.auth().getUser(userId);
  if (!user) {
    return res.status(404).send({ success: false, msg: "User not found" });
  }
  const cartDoc = await cartCollectionRef.doc(cartId).get();
  if (!cartDoc.exists) {
    return res.status(404).send({ success: false, msg: "CART NOT FOUND [SERVER]" });
  }
  const customerName = user.providerData[0].displayName || user.email;
  req.body.customerName = customerName;
  const { error, value } = checkoutSessionSchema.validate(req.body);
  // If there is an error, return a 400 Bad Request response with the error message
  if (error) {
    console.error(`Validation error: ${error.message}`);
    return res.status(400).send(error.message);
  }
  // TODO: Map the items from the cart to the line items
  try {
    let customer;
    const existingCustomer = await stripe.customers.list({ email: value.customerEmail, limit: 1 });
    if (existingCustomer.data.length > 0) {
      customer = existingCustomer.data[0];
    } else {
      customer = await stripe.customers.create(
        { email: value.customerEmail },
        { idempotencyKey: value.customerEmail }
      );
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: value.customerEmail,
      client_reference_id: value.userId,
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: cartDoc.data().items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.productName,
          },
          unit_amount: parseInt((item.productPrice * 100).toFixed(2)),
        },
        quantity: item.productQuantity,
      })),
      mode: "payment",
      success_url: `https://example.com/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "https://example.com/cancel",
    });
    console.log("Checkout session created successfully. Session ID: ", session.id);

    // TODO: Save the session data in the realtime database
    await realtimeDb.ref(`checkout_sessions/${session.id}`).update(session);

    res.status(200).json({ success: true, id: session.id });
    res.redirect(303, session.url);
  } catch (error) {
    console.error(`Error creating checkout session: ${error.message}`);
    res.status(500).send({ success: false, err: error.message });
  }
};

// TODO: Set as an API Action instead of a webhook
// TODO: Create more validations
// FIXME: Some fields may actually be null if a payment intent is not yet been made
const createCheckoutStatusServer = async (req, res, next) => {
  const { sessionId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const checkoutSessionRef = realtimeDb.ref(`checkout_sessions/${sessionId}`);

    // Retrieve the payment status from the Realtime Database
    const snapshot = await checkoutSessionRef.once("value");
    const paymentStatus = snapshot.val()?.payment_status;
    // console.log(session.payment_intent?.id, "Session Payment Intent ID");
    // console.log(paymentStatus, "Payment Status");
    // console.log(session.payment_intent?.status, "Session Payment Intent Status");

    if (
      (session.payment_status === "paid" || session.payment_intent.status === "succeeded") &&
      (paymentStatus === "paid" || paymentStatus === "succeeded")
    ) {
      return res.status(200).send({ success: true, msg: "Checkout session completed" });
    } else if (
      (session.payment_status === "unpaid" || session.payment_intent.status === "requires_payment_method") &&
      (paymentStatus === "unpaid" || paymentStatus === "requires_payment_method")
    ) {
      return res.status(200).send({ success: false, msg: "Checkout session unpaid" });
    } else {
      return res.status(400).send("Invalid payment status");
    }
  } catch (error) {
    console.error(`CHECKOUT SESSION ERROR [SERVER] ${error.message}`);
    return res.status(500).send({
      success: false,
      msg: `CHECKOUT SESSION ERROR [SERVER] ${error.message}`,
    });
  }
}

module.exports = {
  createCheckoutIntentServer, checkoutTestRouteServer, webhookEventHandler, createCheckoutStatusServer, createCheckoutSessionServer,
}
