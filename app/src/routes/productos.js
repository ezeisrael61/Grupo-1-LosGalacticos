const express = require("express");
const router = express.Router();
const controller = require("../controllers/productosControllers");
const {uploadImageProduct} = require('../middlewares/upload')

router.get("/carrito", controller.carrito);
router.get("/descripcion/:id", controller.descripcion);
router.get("/inSale", controller.inSale);
router.get("/featured", controller.featured);
router.get("/filters/:category", controller.filters);

/* Agrega producto */
router.get("/create", controller.create);
router.post("/", uploadImageProduct.single('img'),controller.store);

/* Edit producto */
router.get("/edit/:id", controller.edit);
router.put("/edit/:id", controller.update);

module.exports = router;
