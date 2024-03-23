import Joi from 'joi'
export const BlogValidation = Joi.object({
  type: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  location: Joi.string().valid('Hồ Chí Minh', 'Đà Nẵng').required(),
  user: Joi.object().optional(),
  views: Joi.number().default(0),
  imagebanner: Joi.string().optional(),
  image: Joi.array().optional(),
  comment: Joi.array().optional()
})
