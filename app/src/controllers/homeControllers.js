const dbProducts = require("../database/index");
module.exports = {
      index: (req, res) => {
            const featured = dbProducts.filter((product) => {
                  return product.sold > 50;
            });
            const inSale = dbProducts.filter((product) => {
                  return product.discount > 0;
            });
            return res.render("home", { featured, inSale });
            //res.send(products);
      },
};
