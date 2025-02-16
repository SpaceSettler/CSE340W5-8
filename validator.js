const { body, param, validationResult } = require('express-validator')

const userValidationRules = () => {
    return [
        // id must be hexadecimal string
        param('id').matches(/^[0-9a-fA-F]{24}$/)
    ]
}

const userValidationRulesPut = () => {
    return [
        // id must be hexadecimal string
        param('id').matches(/^[0-9a-fA-F]{24}$/),
        // all must be strings
        body('Name').isString(),
        body('Body').isString(),
        body('Engine').isString(),
        body('Accel').isString(),
        body('Speed').isString(),
        body('Power').isString(),
        body('Torque').isString(),
        body('Price').isString()
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
        }

    return res.status(422).json({
        errors: errors.array()
    })
}

module.exports = { userValidationRules, userValidationRulesPut, validate }