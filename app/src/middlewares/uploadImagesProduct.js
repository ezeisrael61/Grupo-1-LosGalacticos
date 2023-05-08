const multer = require("multer");
const path = require("path");
const { Subcategory, Sequelize } = require("../database/models");

const storageImage = multer.diskStorage({
      destination: function (req, file, callback) {
            Subcategory.findByPk(req.body.subcategory, { include: [{ association: "category" }] }).then((subcategory) => {
                  let ruta = subcategory.category.name;
                  callback(null, "./public/img/" + ruta);
            });
      },
      filename: function (req, file, callback) {
            callback(null, `${Date.now()}_${ruta}${path.extname(file.originalname)}`);
      },
});
const uploadImagesProduct = multer({ storage: storageImage });

module.exports = {
      uploadImagesProduct,
};
