const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../database/products.json");
const dbProducts = require("../database/index");

const writeJson = (products) => {
      fs.writeFileSync(productsFilePath, JSON.stringify(dbProducts), { encoding: "utf-8" });
};

const inSale = dbProducts
      .filter((product) => {
            return product.discount > 0;
      })
      .slice(0, 5);

module.exports = {
      carrito: (req, res) => {
            res.render("products/carrito", { inSale });
      },
      descripcion: (req, res) => {
            const product = dbProducts.find((product) => {
                  return product.id === Number(req.params.id);
            });
            res.render("products/descripcion", { product, inSale });
      },
      filters: (req, res) => {
            const category = req.params.category;
            const products = dbProducts.filter((product) => {
                  return product.category == category;
            });
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
      create: (req, res) => {
            //res.send("pp");
            res.render("products/product-create");
      },
      store: (req, res) => {
            /* Otra forma de sacar el id mas grande */
            /* let lastId = Math.max(...dbProducts.map(product => product.id)); */
            let lastId = dbProducts[dbProducts.length - 1].id;
            let newProduct = {
                  id: lastId + 1,
                  name: req.body.name,
                  price: req.body.price,
                  discount: req.body.discount,
                  description: req.body.description,
                  category: req.body.category,
                  subcategory: req.body.subcategory,
                  image: req.body.img,
                  sold: req.body.sold,
                  stock: req.body.stock,
            };
            dbProducts.push(newProduct);
            writeJson(dbProducts);
            res.redirect("/");
      },
      edit: (req, res) => {
            let productId = Number(req.params.id);
            let productToEdit = dbProducts.find((product) => {
                  return product.id === productId;
            });
            res.render("products/product-edit", { productToEdit });
      },
      update: (req, res) => {
            let productId = Number(req.params.id);

            dbProducts.forEach((product) => {
                  if (product.id === productId) {
                        (product.name = req.body.name),
                              (product.price = req.body.price),
                              (product.discount = req.body.discount),
                              (product.description = req.body.description),
                              (product.category = req.body.category),
                              (product.subcategory = req.body.subcategory),
                              (product.sold = req.body.sold),
                              (product.stock = req.body.stock);
                  }
            });
            writeJson(dbProducts);
            res.redirect("/");
      },
};
