const multer = require("multer");
const path = require("path");

let ruta = "";
const storageImage = multer.diskStorage({
      destination: function (req, file, callback) {
            callback(null, "./public/img/avatar");
      },
      filename: function (req, file, callback) {
            callback(null, `${Date.now()}_${ruta}${path.extname(file.originalname)}`);
      },
});
const uploadAvatar = multer({ storage: storageImage });

module.exports = {
      uploadAvatar,
};
