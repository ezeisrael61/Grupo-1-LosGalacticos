const express = require("express");
const router = express.Router();
const {login,register,store} = require("../controllers/usuariosControllers");
const { upload } = require("../middlewares/upload");
const usersValidator = require("../validator/usersValidator");

router.get("/login", login);
router.get("/registro", register);

router.post("/", upload.single("image"), usersValidator, store);

module.exports = router;
