const express = require("express");
const router = express.Router();
const controller = require("../controllers/productosControllers");

router.get("/carrito", controller.carrito);
router.get("/descripcion/:id", controller.descripcion);
router.get("/filters/:category", controller.filters);

module.exports = router;
