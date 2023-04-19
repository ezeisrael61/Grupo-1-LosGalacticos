const express = require("express");
const router = express.Router();
const { login, storeLogin, logout, register, store, profile, profileEdit, profileUpdate } = require("../controllers/usuariosControllers");
const { uploadAvatar } = require("../middlewares/uploadAvatar");
const usersValidator = require("../validator/usersValidator");
const loginValidator = require("../validator/loginValidator");
const validatorUsersUpdate = require("../validator/validatorUsersUpdate");
const userNotSessionCheck = require("../middlewares/userNotSessionCheck");
const userInSessionCheck = require("../middlewares/userInSessionCheck");

router.get("/login", userInSessionCheck, login);
router.post("/login", loginValidator, storeLogin);
router.get("/logout", logout);

router.get("/register", userInSessionCheck, register);

/* Perfil de Usuario */
router.get("/profile", userNotSessionCheck, profile);
router.get("/profile/edit", userNotSessionCheck, profileEdit);
router.put("/profile/edit", uploadAvatar.single("image"), validatorUsersUpdate, profileUpdate);

router.post("/register", uploadAvatar.single("image"), usersValidator, store);

module.exports = router;
