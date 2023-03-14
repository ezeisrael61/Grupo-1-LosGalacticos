const { readJSON } = require("../database");

const dbProducts = readJSON("products.json");

const inSale = dbProducts
      .filter((product) => {
            return product.discount > 0;
      })
      .slice(0, 5);

module.exports = {
      carrito: (req, res) => {
            res.render("products/carrito", { inSale });
      },
      description: (req, res) => {
            const product = dbProducts.find((product) => {
                  return product.id === Number(req.params.id);
            });
            res.render("products/descripcion", { product, inSale });
      },
      filters: (req, res) => {
            const category = req.params.category;
            let products = "";
            if (category === "all") {
                  products = dbProducts;
            } else {
                  products = dbProducts.filter((product) => {
                        return product.category == category;
                  });
            }
            res.render("products/filters", { products, category });
            //res.send(product);
      },
      inSale: (req, res) => {
            const category = "🔥 ¡OFERTAS SÓLO POR HOY! 🔥;";
            const products = dbProducts.filter((product) => {
                  return product.discount > 0;
            });
            res.render("products/filters", { products, category });
      },
      featured: (req, res) => {
            const category = "✨PRODUCTOS DESTACADOS ✨";
            const products = dbProducts.filter((product) => {
                  return product.sold > 50;
            });
            res.render("products/filters", { products, category });
      },
};
