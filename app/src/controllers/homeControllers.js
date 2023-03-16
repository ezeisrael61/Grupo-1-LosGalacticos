/* const dbProducts = require("../database/index"); */
const { readJSON } = require("../database");

const dbProducts = readJSON("products.json");

module.exports = {
      index: (req, res) => {
            const featured = dbProducts
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
            return res.render("home", { featured, inSale, imageMain, session: req.session });
      },
};
