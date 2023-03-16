const { validationResult } = require("express-validator");
const { readJSON, writeJSON } = require("../database");

const dbProducts = readJSON("products.json");

module.exports = {
      index: (req, res) => {
            return res.render("admin/adminIndex", { session: req.session });
      },
      products: (req, res) => {
            return res.render("admin/adminproducts", { products: dbProducts, session: req.session });
      },
      create: (req, res) => {
            res.render("admin/product-create", {
                  dbcategory: readJSON("categorys.json"),
                  dbSubCategory: readJSON("subCategorys.json"),
                  session: req.session,
            });
      },
      store: (req, res) => {
            /* Otra forma de sacar el id mas grande */
            /* let lastId = Math.max(...dbProducts.map(product => product.id)); */

            const errors = validationResult(req);
            if (errors.isEmpty()) {
                  let lastId = dbProducts[dbProducts.length - 1].id;
                  let newProduct = {
                        id: lastId + 1,
                        name: req.body.name,
                        price: req.body.price,
                        discount: req.body.discount,
                        description: req.body.description,
                        category: req.body.category,
                        subcategory: req.body.subcategory,
                        image: req.file ? req.file.filename : "default-image.png",
                        sold: req.body.sold,
                        stock: req.body.stock,
                  };
                  dbProducts.push(newProduct);
                  writeJSON("products.json", dbProducts);
                  return res.redirect("/");
            } else {
                  res.render("admin/product-create", {
                        dbcategory: readJSON("categorys.json"),
                        dbSubCategory: readJSON("subCategorys.json"),
                        errors: errors.mapped(),
                        old: req.body,
                        session: req.session,
                  });
            }
      },
      edit: (req, res) => {
            let productId = Number(req.params.id);
            let productToEdit = dbProducts.find((product) => {
                  return product.id === productId;
            });
            res.render("admin/product-edit", { productToEdit, session: req.session });
      },
      update: (req, res) => {
            let productId = Number(req.params.id);
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                  dbProducts.forEach((product) => {
                        if (product.id === productId) {
                              product.name = req.body.name;
                              product.price = req.body.price;
                              product.discount = req.body.discount;
                              product.description = req.body.description;
                              product.category = req.body.category;
                              product.subcategory = req.body.subcategory;
                              product.image = req.file ? req.file.filename : product.image;
                              product.sold = req.body.sold;
                              product.stock = req.body.stock;
                        }
                  }),
                        writeJSON("products.json", dbProducts);
                  res.redirect("/");
            } else {
                  let productToEdit = dbProducts.find((product) => {
                        return product.id === productId;
                  });
                  res.render("admin/product-edit", {
                        productToEdit,
                        session: req.session,
                        errors: errors.mapped(),
                        old: req.body,
                  });
            }
      },
      // Delete - Delete one product from DB
      destroy: (req, res) => {
            // obtengo el id del req.params
            let productId = Number(req.params.id);

            // busco el producto a eliminar y lo borro del array
            dbProducts.forEach((product) => {
                  if (product.id === productId) {
                        let productToDestroy = dbProducts.indexOf(product);
                        dbProducts.splice(productToDestroy, 1);
                  }
            });

            writeJSON("products.json", dbProducts);
            res.redirect("/");
      },
};
