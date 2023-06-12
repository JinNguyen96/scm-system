import Joi from "joi";
const validator = (schema: any) => (payload: any) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema: any = Joi.object({
  id: Joi.number(),
  userEmail: Joi.string().email().required(),
  userPassword: Joi.string()
    .min(6)
    .max(16)
    .regex(
      new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,16}$/
      )
    )
    .required(),
  userRole: Joi.required(),
  userFirstName: Joi.string().required(),
  userLastName: Joi.string().required(),
  userType: Joi.required(),
  userPhoneNumber: Joi.number(),
  userDob: Joi.date(),
  userAdress: Joi.string(),
  relatedType: Joi.array(),
  relatedUser: Joi.array(),
});

const signinShema: any = Joi.object({
  userEmail: Joi.string().email().required(),
  userPassword: Joi.string().required(),
});

const createRole: any = Joi.object({
  roleName: Joi.required(),
  roleDescription: Joi.required(),
  roleScopes: Joi.required(),
  rolePermission: Joi.string().required()
});

export const validateSignup = validator(signupSchema);
export const validateSignin = validator(signinShema);
export const validateCreateRole = validator(createRole);