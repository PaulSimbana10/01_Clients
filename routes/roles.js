var express = require('express');
var router = express.Router();
const { Datavalidator } = require('../middleware/DataValidator')
const { Rol }= require('../lib/Schema/rol')
const { findRol, createRol, updateRol, deleteRol } = require('../services/Clients.service')

/* GET rol listing. */
router.get('/', async function (req, res, next) {
  try {
    const { query: { id } } = req;
    const rol = await findRol(id)
    res.status(200).json({
      msg: "Lista de Roles",
      body: rol
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Internal server error",
    });
  }

})
  .post("/",Datavalidator("body", Rol), async (req, res) => {
    try {
      var miarray = req.body.permisos
      var separar = miarray.split(',')
      var rol = {nombre:req.body.nombre, permisos:separar}
      const result = await createRol(rol)
      res.status(200).json({
        msg: "Rol creado",
        body: result.ops
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  })
   .put("/",Datavalidator("body", Rol), async (req, res) => {
    try {
      const { query: {id} } = req;
      var miarray = req.body.permisos
      var separar = miarray.split(',')
      var nombre = req.body.nombre
      const result = await updateRol(id,nombre,separar)
      res.status(200).json({
        msg: "Rol actualizado",
        body: result.ops,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const { params: {id} } = req;
      const result = await deleteRol(id)
      res.status(200).json({
        msg: "Rol eliminado",
        body: result.ops,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  })

module.exports = router;