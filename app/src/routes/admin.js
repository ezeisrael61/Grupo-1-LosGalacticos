const express = require("express");
const router = express.Router();
const { index, products, create, store, edit, update, destroy } = require("../controllers/adminControllers");
const { uploadImagesProduct } = require("../middlewares/uploadImagesProduct");
const productValidator = require("../validator/productsValidator");
const adminNotSessionCheck = require("../middlewares/adminNotSessionCheck");

router.get("/", adminNotSessionCheck, index);
/* Listar producto */
router.get("/products", products);

/* Agrega producto */
router.get("/products/create", adminNotSessionCheck, create);
router.post("/products/create", uploadImagesProduct.single("image"), productValidator, store);

/* Edit producto */
router.get("/products/edit/:id", adminNotSessionCheck, edit);
router.put("/products/edit/:id", uploadImagesProduct.single("image"), productValidator, update);

/*** DELETE ONE PRODUCT***/
router.delete("/products/delete/:id", destroy);

module.exports = router;
