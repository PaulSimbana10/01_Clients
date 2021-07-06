const joi = require("joi");

const Permiso = joi.object({
    nombre: joi.string().min(2).max(500).empty().required(),
});

module.exports = {
    Permiso,
};