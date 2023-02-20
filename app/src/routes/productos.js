const express = require("express");
const router = express.Router();
const controller = require("../controllers/productosControllers");
const { uploadImageProduct } = require("../middlewares/upload");

router.get("/carrito", controller.carrito);
router.get("/descripcion/:id", controller.descripcion);
router.get("/inSale", controller.inSale);
router.get("/featured", controller.featured);

/* Agrega producto */
router.get("/create", controller.create);
router.post("/", uploadImageProduct.single("img"), controller.store);

router.get("/:category", controller.filters);

/* Edit producto */
router.get("/edit/:id", controller.edit);
router.put("/edit/:id", controller.update);

/*** DELETE ONE PRODUCT***/
router.delete("/delete/:id", controller.destroy);

module.exports = router;
