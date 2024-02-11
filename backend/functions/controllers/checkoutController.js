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
  const checkout = event.data.object

  switch (event.type) {
    case "charge.succeeded":
      // Get the Charge object from the event data
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
      break;
    case "payment_intent.canceled":
      // Get the Payment Intent object from the event data
      // Update your Realtime Database with the payment intent
      // Perform any other action you want for a successful payment intent
      break;
    case "checkout.session.expired":

      console.log("Checkout session expired", session.id, session.payment_status, session.url);
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
// TODO: Expire the checkout session if the amount given is exactly the same as the total price, which means the payment intent is successful, too avoid creating a payment intent for the same checkout session
// FIXME: "status": "requires_payment_method", FROM THE RESPONSE BODY OF THE PAYMENT INTENT
// FIXME: If the payment intent is successful, then the checkout session is successful, and must be updated for the stripe api as well as the realtime database
// FIXME: Upon updating the checkout session payment_status successfully to "paid", the payment intent must be updated as well
// FIXME: Disable the checkout session if the payment intent is successful, to avoid creating a payment intent for the same checkout session
// NOTE: This will be not be needed test with the given url from the checkout session object
// FIXME: A payment intent is created but since the status is not a part of paymentIntent object apparently(it should be don't know why its not working), i cant update the payment intent status to "succeeded", to match the checkout session status, tf?! for now i can just use the checkout session url to checkout
const createCheckoutIntentServer = async (req, res) => {
  const { sessionId, totalPrice } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      console.log("Checkout session is already paid.");
      res.status(409).send({ success: true, id: session.payment_intent, msg: "Checkout session is already paid for" });
      return;
    }

    const customerId = session.customer;
    const customer = await stripe.customers.retrieve(customerId);
    const { customer_email, name } = customer;

    if (totalPrice >= session.amount_total) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice,
        currency: "usd",
        description: "(created by Stripe CLI)",
        payment_method_types: ["card"],
        customer: customerId,
        metadata: {
          customer_email,
          name,
          sessionId,
        },
      });

      // FIXME: Why is the status not part of the paymentIntent object??
      await stripe.paymentIntents.update(
        paymentIntent.id,
        {
          metadata: {
            checkout_session: sessionId,
          },
          status: "succeeded"
        }
      );

      await realtimeDb.ref(`checkout_sessions/${sessionId}`).update({
        session: {
          payment_status: "paid",
          id: session.id,
        },
        paymentIntent: {
          id: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          metadata: paymentIntent.metadata,
        },
      });

      res.status(200).send({ success: true, id: paymentIntent.id });
    } else {
      res.status(400).send({ success: false, msg: "Not enough funds" });
    }

  } catch (error) {
    console.error(`Error creating checkout payment intent: ${error.message}`);
    res.status(500).send(error.message);
  }
};

// TODO: Assign the total price to the checkout session, based on the cart doc, and the items, majority of the items from the request body must come from the session object
// TODO: Complete the check from the checkoutSchema
// TODO: Create cart middleware to check if the user is the owner of the cart
// TODO: Fix the customer fields to be included properly in the checkout session object
// NOTE: To complete the checkout session just taking url from the response body of the checkout session object, then checking out via that url
// TODO: Just checkout for the cart owner instead of assigning the userId directly to the checkout session object, this will be done later
// NOTE: Creating 2 separate calls to the realtime database and stripe's api to create a checkout session, and then updating the checkout session in the realtime database and stripe's api with the same data might slow things down, this will be changed later
// REVIEW: Check for an existing session that is unpaid, and if it is unpaid, then return that session and persist it, if not create a new session
// FIXME: There are some issues with the header values 
// ">  Error creating or retrieving checkout session: Cannot set headers after they are sent to the client"
const createCheckoutSessionServer = async (req, res) => {
  const { userId, cartId } = req.body;
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
  if (error) {
    console.error(`Validation error: ${error.message}`);
    return res.status(400).send(error.message);
  }
  try {
    let session;
    const existingCustomer = await stripe.customers.list({ id: value.customerId, limit: 1 });
    let customer;
    if (existingCustomer.data.length > 0) {
      customer = existingCustomer.data[0];
    } else {
      customer = await stripe.customers.create(
        { email: value.customerEmail },
        { idempotencyKey: value.customerId }
      );
    }
    // Get the active sessions for the customer
    const activeSessions = await stripe.checkout.sessions.list({ customer: customer.id });
    // Find the active session with the same cart ID
    const activeSession = activeSessions.data.find((s) => s.metadata.cartId === cartId);
    console.log("Active session: ", activeSession)
    // Check if the session is still pending payment and has a valid URL
    if (activeSession.payment_status === "requires_payment_method" && activeSession.url) {
      return res.status(200).json({ success: true, id: activeSession.id, url: activeSession.url });
    }
    if (activeSession.url !== null) {
      session = await stripe.checkout.sessions.retrieve(activeSession.id);
      console.log("Active checkout session found. Session ID: ", activeSession.id);
      return res.status(409).json({ success: true, id: activeSession.id, url: activeSession.url, msg: `There is already an existing checkout session for Cart ID: ${cartId}` });
    }
    else {
      session = await stripe.checkout.sessions.create({
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
        metadata: {
          cartId,
          userId,
        },
      });
      console.log("Checkout session created successfully. Session ID: ", session.id);
    }
    await realtimeDb.ref(`checkout_sessions/${session.id}`).set({
      session: {
        payment_status: session.payment_status,
        payment_intent: session.payment_intent,
      },
      paymentIntent: {
        id: session.payment_intent,
        status: session.payment_status,
        amount: session.amount_total,
        currency: session.currency,
        description: session.description,
        metadata: session.metadata,
      },
    });

    res.status(200).json({ success: true, id: session.id, url: session.url });
  }
  catch (error) {
    console.error(`Error creating or retrieving checkout session: ${error.message}`);
    res.status(500).send(error.message);
  }
};


// TODO: Set as an API Action instead of a webhook
// TODO: Create more validations
// FIXME: Some fields may actually be null if a payment intent is not yet been made
// FIXME: The payment intent id is not yet been made, so it is null, and may be causing issues, this will be fixed later
const createCheckoutStatusServer = async (req, res, next) => {
  const { sessionId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentIntentId = session?.payment_intent;

    if (!paymentIntentId) {
      return res.status(200).send({ success: false, msg: `No payment intent has been made for Session: ${sessionId}` });
    }

    const paymentIntent = await stripe.paymentIntents?.retrieve(paymentIntentId);
    console.log(session, "Session Data")

    if ((session.payment_status === "paid" || paymentIntent?.status === "succeeded") && session.status === "complete" && session.url === null) {
      return res.status(200).send({ success: true, msg: "Checkout session completed" });
    } else if (session.payment_status === "unpaid" || paymentIntent?.status === "requires_payment_method") {
      return res.status(200).send({ success: false, msg: "Checkout session unpaid" });
    } else {
      return res.status(400).send("Invalid payment status");
    }
  } catch (error) {
    console.error(`GET CHECKOUT STATUS [SERVER] ${error.message}`);
    return res.status(500).send({
      success: false,
      msg: `GET CHECKOUT STATUS [SERVER] ${error.message}`,
    });
  }
}

const getCheckoutSessionByIdServer = async (req, res, next) => {
  const sessionId = req.params.sessionId;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return res.status(200).send({ success: true, data: session });
  } catch (error) {
    return res.status(500).send({ success: false, msg: `GET SESSION BY ID ERROR [SERVER] ${error.message}` });
  }
};

const getSessionLineItemsServer = async (req, res, next) => {
  const sessionId = req.params.sessionId;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
    return res.status(200).send({ success: true, data: lineItems });
  } catch (error) {
    return res.status(500).send({ success: false, msg: `GET SESSION LINE ITEMS ERROR [SERVER] ${error.message}` });
  }
};

module.exports = {
  createCheckoutIntentServer, checkoutTestRouteServer, webhookEventHandler, createCheckoutStatusServer, createCheckoutSessionServer, getCheckoutSessionByIdServer, getSessionLineItemsServer,
}
