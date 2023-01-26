const express = require("express");
const router = express.Router();
const controller = require("../controllers/productosControllers");

router.get("/carrito", controller.carrito);
router.get("/descripcion", controller.descripcion);
router.get("/busqueda", controller.busqueda);

module.exports = router;
