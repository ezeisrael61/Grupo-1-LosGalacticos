const { check } = require("express-validator");
const path = require("path");

module.exports = [
      check("firstName").notEmpty().withMessage("El nombre es obligatorio").bail().isLength({ min: 3, max: 30 }).withMessage("En nombre debe tener entre 3 y 30 caracteres"),
      check("lastName").notEmpty().withMessage("El apellido es obligatorio").bail().isLength({ min: 3, max: 20 }).withMessage("En apellido debe tener entre 3 y 20 caracteres"),

      /* check("email").notEmpty().withMessage("El email es obligatorio").bail().isEmail().withMessage("Email invalido"), */

      check("image").custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".web"];
            if (file && !acceptedExtensions.includes(path.extname(file.originalname))) {
                  throw new Error("archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif -.web)");
            }
            return true;
      }),
      check("province").notEmpty().withMessage("Seleccione una Provincia"),
      check("city").notEmpty().withMessage("Seleccione una Localidad"),
];
