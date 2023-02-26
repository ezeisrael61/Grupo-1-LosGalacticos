const multer = require("multer");
const path = require("path");

const storageImage = multer.diskStorage({
      destination: function (req, file, callback) {
            let ruta = "";
            if (req.body.category) {
                  ruta = req.body.category;
            } else {
                  ruta = "avatar";
            }
            callback(null, "./public/img/" + ruta);
      },
      filename: function (req, file, callback) {
            callback(null, `${Date.now()}_products_${path.extname(file.originalname)}`);
      },
});
const upload = multer({ storage: storageImage });

module.exports = {
      upload,
};
