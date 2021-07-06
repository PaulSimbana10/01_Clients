const joi = require("joi");

const Rol = joi.object({
    nombre: joi.string().min(2).max(50).empty().required(),
    permisos: joi.string().min(2).max(5000).empty().required(),
});

module.exports = {
    Rol,
};