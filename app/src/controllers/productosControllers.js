const dbProducts = require("../database/index");

const featured = dbProducts.filter((product) => {
      return product.sold > 50;
});
module.exports = {
      carrito: (req, res) => {
            res.render("products/carrito", { featured });
      },
      descripcion: (req, res) => {
            const product = dbProducts.find((product) => {
                  return product.id === Number(req.params.id);
            });
            res.render("products/descripcion", { product, featured });
            //res.send(product);
      },
      filters: (req, res) => {
            const category = req.params.category;
            const products = dbProducts.filter((product) => {
                  return product.category == category;
            });
            res.render("products/filters", { products, category });
      },
};
