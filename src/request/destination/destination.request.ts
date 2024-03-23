import Joi from 'joi'
export const DestinationValidation = Joi.object({
  type: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  location: Joi.string().valid('hcm', 'dn').required(),
  user: Joi.object().optional(),
  views: Joi.number().default(0),
  image: Joi.string().optional()
})
