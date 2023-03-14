const express = require("express");
const router = express.Router();
const { carrito, description, inSale, featured, filters } = require("../controllers/productosControllers");

router.get("/carrito", carrito);
router.get("/descripcion/:id", description);
router.get("/inSale", inSale);
router.get("/featured", featured);

router.get("/:category", filters);

module.exports = router;
