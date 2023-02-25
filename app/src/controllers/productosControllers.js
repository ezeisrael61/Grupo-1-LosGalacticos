const { validationResult } = require("express-validator");
const { readJSON, writeJSON } = require("../database");

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
      descripcion: (req, res) => {
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
      create: (req, res) => {
            //res.send("pp");

            res.render("products/product-create", {
                  dbcategory: readJSON("categorys.json"),
                  dbSubCategory: readJSON("subCategorys.json"),
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
                        image: req.file ? req.file.filename : "defauld.png",
                        sold: req.body.sold,
                        stock: req.body.stock,
                  };
                  dbProducts.push(newProduct);
                  writeJSON("products.json", dbProducts);
                  return res.redirect("/");
            } else {
                  res.render("products/product-create", {
                        dbcategory: readJSON("categorys.json"),
                        dbSubCategory: readJSON("subCategorys.json"),
                        errors: errors.mapped(),
                        old: req.body,
                  });
            }
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

            //let newProductsArray = products.filter(product => product.id !== productId)

            // sobreescribo el json con el array de productos modificado
            //writeJson(newProductsArray)

            // retorno un mensaje de exito
            res.redirect("/");
      },
};
