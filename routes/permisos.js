var express = require('express');
var router = express.Router();
const { Datavalidator } = require('../middleware/DataValidator')
const { Permiso }= require('../lib/Schema/permiso')
const { createPerm, updatePerm, deletePerm, findPerm } = require('../services/Clients.service')

/* GET rol listing. */
router.get('/', async function (req, res, next) {
  try {
    const { query: { id } } = req;
    const users = await findPerm(id);
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
  .post("/",Datavalidator("body", Permiso), async (req, res) => {
    try {
      let { body: rol } = req
      const result = await createPerm(rol)
      res.status(200).json({
        msg: "permiso creado",
        body: result.ops
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  })
   .put("/",Datavalidator("body", Permiso), async (req, res) => {
    try {
      const { query: {id} } = req;
      const { nombre } = req.body;
      const result = await updatePerm(id,nombre)
      res.status(200).json({
        msg: "permiso actualizado",
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
      const result = await deletePerm(id)
      res.status(200).json({
        msg: "permiso eliminado",
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