/* const dbProducts = require("../database/index"); */
//const { readJSON } = require("../database");

//const dbProducts = readJSON("products.json");
const db =require("../database/models")
module.exports = {
      index: (req, res) => {
            db.Products.findAll()
            .then((products)=> {
                  return res.render("pruebaproduct", {products:products})
            })
            
            /*const featured = dbProducts
                  .filter((product) => {
                        return product.sold > 50;
                  })
                  .slice(0, 5);
            const inSale = dbProducts
                  .filter((product) => {
                        return product.discount > 0;
                  })
                  .slice(0, 5);
            const imageMain = dbProducts;
            return res.render("home", { featured, inSale, imageMain, session: req.session });*/
                 
      },
};
