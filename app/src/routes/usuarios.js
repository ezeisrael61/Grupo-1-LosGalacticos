const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuariosControllers");
const { upload } = require("../middlewares/upload");
const usersValidator = require("../validator/usersValidator");
const loginValidator = require("../validator/loginValidator");

router.get("/login", controller.login);
router.post("/login", loginValidator, controller.storeLogin);

router.get("/registro", controller.registro);

router.post("/", upload.single("image"), usersValidator, controller.store);

module.exports = router;
