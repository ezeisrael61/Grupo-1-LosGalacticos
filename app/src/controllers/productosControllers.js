//const { readJSON } = require("../database");

//const dbProducts = readJSON("products.json");

/*const inSale = dbProducts
      .filter((product) => {
            return product.discount > 0;
      })
      .slice(0, 5);*/
const db= require("../database/models");

module.exports = {
      /*carrito: (req, res) => {
            res.render("products/carrito", { inSale, session: req.session });
      },
      description: (req, res) => {
            const product = dbProducts.find((product) => {
                  return product.id === Number(req.params.id);
            });
            res.render("products/descripcion", { product, inSale, session: req.session });
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
            res.render("products/filters", { products, category, session: req.session });
            //res.send(product);
      },
      inSale: (req, res) => {
            const category = "🔥 ¡OFERTAS SÓLO POR HOY! 🔥;";
            const products = dbProducts.filter((product) => {
                  return product.discount > 0;
            });
            res.render("products/filters", { products, category, session: req.session });
      },
      featured: (req, res) => {
            const category = "✨PRODUCTOS DESTACADOS ✨";
            const products = dbProducts.filter((product) => {
                  return product.sold > 50;
            });
            res.render("products/filters", { products, category, session: req.session });
      },
      buscar: (req, res) => {
            let valor = req.query.valor;
            products = dbProducts.filter((product) => {
                  product.name = product.name.toLowerCase();
                  if (product.name.includes(valor.toLowerCase())) {
                        return product;
                  }
            });

            category = "all";
            res.render("products/filters", { products, category, session: req.session });
      },*/
};
