const { check, body } = require("express-validator");
const { readJSON } = require("../database");
const bcrypt = require("bcryptjs");
const { User } = require("../database/models");

/* const users = readJSON("users.json"); */

module.exports = [
      /*check("email").notEmpty().withMessage("El email es obligatorio").bail().isEmail().withMessage("Email invalido"),

      body("email")
            .custom((value) => {
                  let user = users.find((user) => user.email === value);
                  return user !== undefined;
            })
            .withMessage("Email no registrado"),

      check("pass").notEmpty().withMessage("Mal"),

         body("pass")
            .custom((value, { req }) => {
                  let user = users.find((user) => user.email === req.body.email);

                  return bcrypt.compareSync(value, user.password);
            })
            .withMessage("Contraseña inválida"), */
      check("email").notEmpty().withMessage("El email es obligatorio").bail().isEmail().withMessage("Email inválido"),

      check("pass").notEmpty().withMessage("Debes escribir tu contraseña"),
      body("pass").custom((value, { req }) => {
            return User.findOne({
                  where: {
                        email: req.body.email,
                  },
            })
                  .then((user) => {
                        if (!bcrypt.compareSync(value, user.password)) {
                              return Promise.reject();
                        }
                  })
                  .catch(() => Promise.reject("Email o contraseña incorrecto"));
      }),
];
