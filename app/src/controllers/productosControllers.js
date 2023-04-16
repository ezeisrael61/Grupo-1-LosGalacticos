//const { readJSON } = require("../database");

//const dbProducts = readJSON("products.json");

/*const inSale = dbProducts
      .filter((product) => {
            return product.discount > 0;
      })
      .slice(0, 5);*/
const { Product, Category, Sequelize } = require("../database/models");
const { Op } = Sequelize;

const INSALE_PROMISE = Product.findAll({
      where: {
            discount: {
                  [Op.gt]: 0,
            },
      },
      order: [["discount", "DESC"]],
      limit: 5,
      include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
});

module.exports = {
      carrito: (req, res) => {
            res.render("products/carrito", { inSale, session: req.session });
      },
      description: (req, res) => {
            const PRODUCT_PROMISE = Product.findByPk(req.params.id, {
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            });

            Promise.all([PRODUCT_PROMISE, INSALE_PROMISE])
                  .then(([product, inSale, imageMain]) => {
                        return res.render("products/descripcion", {
                              product,
                              inSale,
                              session: req.session,
                        });
                  })
                  .catch((error) => console.log(error));
      },
      filters: (req, res) => {
            let category = req.params.category;
            if (category != "all") {
                  Product.findAll({
                        where: {
                              "$subcategory.category.name$": category,
                        },

                        include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
                  }).then((products) => {
                        return res.render("products/filters", { products, category, session: req.session });
                  });
            } else {
                  Product.findAll({
                        include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
                  }).then((products) => {
                        return res.render("products/filters", { products, category, session: req.session });
                  });
            }
      },
      inSale: (req, res) => {
            const category = "🔥 ¡OFERTAS SÓLO POR HOY! 🔥;";
            Product.findAll({
                  where: {
                        discount: {
                              [Op.gt]: 0,
                        },
                  },
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            }).then((products) => {
                  res.render("products/filters", { products, category, session: req.session });
            });
            /* const products = dbProducts.filter((product) => {
                  return product.discount > 0;
            });
            res.render("products/filters", { products, category, session: req.session }); */
      },
      featured: (req, res) => {
            const category = "✨PRODUCTOS DESTACADOS ✨";
            Product.findAll({
                  where: {
                        sold: {
                              [Op.gt]: 50,
                        },
                  },
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            }).then((products) => {
                  res.render("products/filters", { products, category, session: req.session });
            });
            /*  const products = dbProducts.filter((product) => {
                  return product.sold > 50;
            });
            res.render("products/filters", { products, category, session: req.session }); */
      },
      buscar: (req, res) => {
            /* let valor = req.query.valor;
            products = dbProducts.filter((product) => {
                  product.name = product.name.toLowerCase();
                  if (product.name.includes(valor.toLowerCase())) {
                        return product;
                  }
            });

            category = "all";
            res.render("products/filters", { products, category, session: req.session }); */
            let valor = req.query.valor;
            category = "all";
            Product.findAll({
                  where: {
                        name: { [Op.substring]: valor },
                  },

                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            }).then((products) => {
                  return res.render("products/filters", { products, category, session: req.session });
            });
      },
};
