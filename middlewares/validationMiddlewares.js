const Joi = require("joi");

module.exports = {
  schemaAdd: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean().optional(),
    });

    const error = schema.validate(req.body).error;
    if (error) {
      return res.status(400).json({
        message: `missing required field, ${error.details[0].message}.`,
      });
    }
    next();
  },

  schemaUpdate: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().optional(),
      phone: Joi.string().optional(),
      favorite: Joi.boolean().optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }
    next();
  },

  schemaUserValidate: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  },
};
