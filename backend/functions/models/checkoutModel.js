// TODO: This is not yet final
const Joi = require("joi").extend(require("@joi/date"));

// FIXME: Can you create a checkoutSessionSchema for the checkout session object?
// TODO: Replace this with the actual list of payment options from Stripe or any other provider
const paymentMethodList = [
  "card", // Visa, Mastercard, American Express, JCB, Diners Club, China UnionPay
  "wallet", // Apple Pay, Google Pay
  "bank_debit", // ACH Direct Debit, SEPA Direct Debit
  "bank_redirect", // iDEAL, EPS, giropay, Bancontact, P24, FPX, UPI
  "bank_transfer", // SEPA Bank Transfer, Japan Bank Transfer, Mexico Bank Transfer
  "buy_now_pay_later", // Afterpay, Klarna, Affirm
  "voucher", // OXXO, Boleto
];

const paymentStatusList = [
  "requires_payment_method", "requires_confirmation", "requires_action", "processing", "requires_capture", "succeeded", "canceled",
];
// NOTE: This will follow the Stripe Checkout Session object, as much as possible
// NOTE: Only the required fields are actually needed in the api request body
const checkoutSessionSchema = Joi.object({
  checkoutSessionId: Joi.string(),
  // NOTE: This is needed in the request body to create a checkout session
  userId: Joi.string().required(),
  createdAt: Joi.date().iso(),
  paymentMethod: Joi.string().valid(...paymentMethodList).default("card"),
  customerName: Joi.string(),
  customerPhone: Joi.string(),
  customerEmail: Joi.string().email(),
  lineItems: Joi.array().items(Joi.object({
    price_data: Joi.object({
      currency: Joi.string().required(),
      product_data: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
      }).required(),
      unit_amount: Joi.number().required(),
    }).required(),
    quantity: Joi.number().required(),
  })).optional(),
  // shippingAddress: Joi.object({
  //   addressLine1: Joi.string().required(),
  //   addressLine2: Joi.string().optional(),
  //   city: Joi.string().required(),
  //   state: Joi.string().required(),
  //   postalCode: Joi.string().required(),
  //   country: Joi.string().required(),
  // }).optional(),
  // NOTE: This is needed in the request body to create a checkout session
  cartId: Joi.string().required(),
  paymentStatus: Joi.string().valid(...paymentStatusList),
  paid: Joi.boolean(),
  paymentIntentId: Joi.string(),
});

module.exports = checkoutSessionSchema;
