const express = require("express");
const router = express.Router();
const { login, register, store, storeLogin } = require("../controllers/usuariosControllers");
const { upload } = require("../middlewares/upload");
const usersValidator = require("../validator/usersValidator");
const loginValidator = require("../validator/loginValidator");

router.get("/login", login);
router.post("/login", loginValidator, storeLogin);

router.get("/register", register);

router.post("/", upload.single("image"), usersValidator, store);

module.exports = router;
