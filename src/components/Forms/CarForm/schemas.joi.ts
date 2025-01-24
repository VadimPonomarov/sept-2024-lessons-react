import Joi from "joi";

const currentYear = new Date().getFullYear();

export const schema = Joi.object({
  id: Joi.number().optional().messages({
    "number.base": "ID must be a number",
  }),
  brand: Joi.string().required().messages({
    "string.base": "Brand must be a string",
    "any.required": "Brand is required",
    "string.empty": "Brand is not allowed to be empty",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required",
  }),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(currentYear)
    .required()
    .messages({
      "number.base": "Year must be a number",
      "number.integer": "Year must be an integer",
      "number.min": `Year must be at least 1900`,
      "number.max": `Year must be at most ${currentYear}`,
      "any.required": "Year is required",
    }),
});
