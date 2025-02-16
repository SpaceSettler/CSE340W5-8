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
        // can't leave any vaules unchanged
        body('').matches("any")
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
        }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = { userValidationRules, userValidationRulesPut, validate }