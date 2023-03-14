const express = require("express");
const router = express.Router();
const { index, products, create, store, edit, update, destroy } = require("../controllers/adminControllers");
const { upload } = require("../middlewares/upload");
const productValidator = require("../validator/productsValidator");

router.get("/", index);
/* Listar producto */
router.get("/products", products);

/* Agrega producto */
router.get("/products/create", create);
router.post("/products/create", upload.single("image"), productValidator, store);

/* Edit producto */
router.get("/products/edit/:id", edit);
router.put("/products/edit/:id", upload.single("image"), productValidator, update);

/*** DELETE ONE PRODUCT***/
router.delete("/products/delete/:id", destroy);

module.exports = router;
