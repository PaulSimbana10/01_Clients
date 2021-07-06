const joi = require("joi");

const User = joi.object({
  primer_nombre: joi.string().min(2).max(50).empty().required(),
  primer_apellido: joi.string().min(2).max(50).empty().required(),
  segundo_nombre: joi.string().min(2).max(50).empty().required(),
  segundo_apellido: joi.string().min(2).max(50).empty().required(),
 // password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  //repeat_password: Joi.ref("password"),
});

const changePassword = joi.object({
  newPassword: joi.string().min(5).empty().required(),
  repeatPassword: joi.string().empty().required(),
});

module.exports = {
  User,
  changePassword,
};