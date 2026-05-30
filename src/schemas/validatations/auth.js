import Joi from "joi";

export const signUpSchema = Joi.object({
    email: Joi.string().required().email({maxDomainSegments:2, tlds:{allow:false}}),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
})

export const loginSchema = Joi.object({
    email: Joi.string().required().email({maxDomainSegments:2, tlds:{allow:false}}),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
})