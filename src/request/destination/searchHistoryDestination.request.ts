import Joi from 'joi'
export const DestinationValidation = Joi.object({
  idUser: Joi.string().required(),
  title: Joi.string().required(),
  location: Joi.string().valid('hcm', 'dn').required()
})
