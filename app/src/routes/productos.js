const express = require("express");
const router = express.Router();
const controller = require("../controllers/productosControllers");

router.get("/carrito", controller.carrito);
router.get("/descripcion/:id", controller.descripcion);
router.get("/inSale", controller.inSale);
router.get("/featured", controller.featured);
router.get("/:category", controller.filters);

/* Agrega producto */
router.get("/create", controller.create);
router.post("/", controller.store);

/* Edit producto */
router.get("/edit/:id", controller.edit);
router.put("/edit/:id", controller.update);

module.exports = router;
