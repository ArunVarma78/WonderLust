const Joi = require("joi");

module.exports = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
    image: Joi.string().allow("", null),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  reviews: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
