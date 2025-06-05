const Joi = require("joi");

const formValidations = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(100).required().messages({
            'string.base': `"name" should be a type of 'text'`,
            'string.empty': `"name" cannot be an empty field`,
            'string.min': `"name" should have a minimum length of 4 characters`,
            'string.max': `"name" should have a maximum length of 100 characters`,
            'any.required': `"name" is a required field`
        }),
        email: Joi.string().email().required().messages({
            'string.email': `"email" must be a valid email`,
            'any.required': `"email" is a required field`
        }),
        contact: Joi.string()
            .pattern(/^\d+$/) // Only allow digits
            .min(10) // Minimum length for contact
            .max(15) // Maximum length for contact
            .required()
            .messages({
                'string.pattern.base': `"contact" must contain only digits`,
                'string.min': `"contact" must be at least 10 digits long`,
                'string.max': `"contact" must not be more than 15 digits long`,
                'any.required': `"contact" is a required field`
            })
    });

    const { error } = schema.validate(req.body);

    if (error) {
        const errorMessages = error.details.map(detail => detail.message); // Extract detailed error messages
        return res.status(400).json({ message: "Validation Error", errors: errorMessages }); // Return specific validation messages
    }
    next();
}

module.exports = { formValidations };
