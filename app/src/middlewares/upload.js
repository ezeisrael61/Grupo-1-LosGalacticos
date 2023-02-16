const multer= require("multer");
const path = require('path');

const storeImageProduct = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null, "public/img")
    },
    filename : function (req,file,callback) {
        callback(null,`${Date.now()}_products_${path.extname(fiñe.orininalname)}`)
    } 
});

const uploadImageProduct = multer({
    storage: storeImageProduct
})

module.exports = {
    uploadImageProduct
}