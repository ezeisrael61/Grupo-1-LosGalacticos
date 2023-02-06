const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../database/products.json");
const dbProducts = require("../database/index");

const writeJson = (products) => {
      fs.writeFileSync(productsFilePath, JSON.stringify(dbProducts), { encoding: "utf-8" });
};

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
      create: (req, res) => {
            res.render("products/product-create");
      },
      store: (req, res) => {
            let lastId = dbProducts[dbProducts.length - 1].id;
            let newProduct = {
                  id: lastId + 1,
                  name: req.body.name,
                  price: req.body.price,
                  discount: req.body.discount,
                  description: req.body.description,
                  category: req.body.category,
                  subcategory: req.body.subcategory,
                  image: "default-image.png",
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
