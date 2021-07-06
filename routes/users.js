var express = require('express');
var router = express.Router();
const { Datavalidator } = require('../middleware/DataValidator')
const { User, changePassword }= require('../lib/Schema/User')
const { findUsers, createUser, updateUser, deleteUser, change_password, changePasswords } = require('../services/Clients.service')

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const { query: { id } } = req;
    const users = await findUsers(id);
    res.status(200).json({
      msg: "Path Users",
      body: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server error",
    });
  }
})
  .post("/", Datavalidator("body", User), async (req, res) => {
    try {
      const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido } = req.body;
      const result = await createUser(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido );
      res.status(200).json({
        msg: "Usuario Creado",
        body: result.ops,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server error",
      });
    }
  })
  .put("/",Datavalidator("body", User), async (req, res) => {
    try {
      const { query: { id } } = req;
      const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido } = req.body;
      const result = await updateUser(id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido)
      res.status(200).json({
        msg: "usuario actualizado",
        body: result.ops,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  })
  .put("/change-password/:id",Datavalidator("body",changePassword), async (req, res) => {

    try {
      const { params: {id} } = req;
      const {newPassword, repeatPassword} = req.body;
      const change_pass = await changePasswords(id, newPassword, repeatPassword);

      if (change_pass.msg == "error"){
        res.status(200).json({
          msg: "Las contraseñas no coinciden",
        });
      }
      else{
        
        res.status(200).json({
          msg: "Contraseña Actualizada",
          body: change_pass.ops,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server error",
      });
    }

  })
  .delete("/:id", async (req, res) => {
    try {
      const { params: { id } } = req;
      const result = await deleteUser(id)
      res.status(200).json({
        msg: "usuario eliminado",
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
