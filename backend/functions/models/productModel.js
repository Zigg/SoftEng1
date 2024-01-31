/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const Joi = require("joi");

const productSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  basePrice: Joi.number().required(),
  sizes: Joi.array().items(Joi.object({
    price: Joi.number().required(),
    name: Joi.string().required(),
  })).optional(),
  addons: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
  })).optional(),
  ingredients: Joi.array().items(Joi.string()),
  description: Joi.string().min(1),
  category: Joi.string().required(),
  imageUrl: Joi.string(),
  isFeatured: Joi.boolean().required().default(false),
  isPublished: Joi.boolean().required(),
  nutritionalInfo: Joi.object({
    calories: Joi.number().required(),
    carbohydrates: Joi.number().required(),
    fat: Joi.number().required(),
    fiber: Joi.number().required(),
    protein: Joi.number().required(),
    sugar: Joi.number().required(),
  }).optional(),
  preparationTime: Joi.number().required(),
});

// TODO: Pass the response for validation
const data = {};
const { error, value } = productSchema.validate(data);

// TODO: Handle the validation result
if (error) {
  console.error("Validation error:", error.message);
} else {
  console.log("Validation success:", value);
}

module.exports = {
  productSchema,
};
