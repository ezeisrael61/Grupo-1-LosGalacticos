const multer = require("multer");
const path = require("path");
const { Subcategory, Sequelize } = require("../database/models");


const storageImage = multer.diskStorage({
      destination: function (req, file, callback) {
            
            Subcategory.findByPk(req.body.subcategory, { include: [{ association: "category" }] }).then((subcategory) => {
                  
                  callback(null, "./public/img/");
            });
      },
      filename: function (req, file, callback) {
            callback(null, `${Date.now()}_${path.extname(file.originalname)}`);
      },
});
const uploadImagesProduct = multer({ storage: storageImage });

module.exports = {
      uploadImagesProduct,
};
