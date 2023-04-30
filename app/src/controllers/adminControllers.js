const { Product, Image, Category, Subcategory, Sequelize } = require("../database/models");
const { Op } = Sequelize;
const { validationResult } = require("express-validator");
const fs = require("fs");
let procedures = {
      deleteImage: (id) => {
            Product.findByPk(id, {
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            }).then((product) => {
                  if (product.images[0].name != "default-image.png") {
                        //return console.log(product.images[0].name);
                        const MATCH = fs.existsSync(`./public/img/${product.subcategory.category.name}/`, product.images[0].name);
                        if (MATCH) {
                              try {
                                    fs.unlinkSync(`./public/img/${product.subcategory.category.name}/${product.images[0].name}`);
                              } catch (error) {
                                    throw new Error(error);
                              }
                        } else {
                              console.log("No se encontró el archivo");
                        }
                  }
            });
      },
};

module.exports = {
      index: (req, res) => {
            Product.findAll({
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            });
            return res.render("admin/adminIndex", { session: req.session });
      },
      products: (req, res) => {
            Product.findAll({
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            }).then((products) => {
                  return res.render("admin/adminproducts", { products, session: req.session });
            });
      },
      create: (req, res) => {
            const PRODUCT_ALL = Product.findByPk(req.params.id, {
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            });
            const CATEGORY_ALL = Category.findAll({
                  include: [{ association: "subcategories" }],
            });
            const SUBCATEGORY_ALL = Subcategory.findAll({
                  include: [{ association: "products" }, { association: "category" }],
            });

            Promise.all([PRODUCT_ALL, CATEGORY_ALL, SUBCATEGORY_ALL])
                  .then(([productToEdit, category, subcategory]) => {
                        res.render("admin/product-create", { productToEdit, category, subcategory, session: req.session });
                  })
                  .catch((error) => console.log(error));
      },
      store: (req, res) => {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                  Product.create({
                        name: req.body.name,
                        price: req.body.price,
                        discount: req.body.discount,
                        description: req.body.description,
                        idSubCategory: req.body.subcategory,
                        sold: req.body.sold,
                        stock: req.body.stock,
                  }).then((products) => {
                        Image.create({
                              name: req.file ? req.file.filename : "default-image.png",
                              idProduct: products.idProduct,
                        }).then(() => {
                              return res.redirect("/admin/products");
                        });
                  });
            } else {
                  const PRODUCT_ALL = Product.findByPk(req.params.id, {
                        include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
                  });
                  const CATEGORY_ALL = Category.findAll({
                        include: [{ association: "subcategories" }],
                  });
                  const SUBCATEGORY_ALL = Subcategory.findAll({
                        include: [{ association: "products" }, { association: "category" }],
                  });

                  Promise.all([PRODUCT_ALL, CATEGORY_ALL, SUBCATEGORY_ALL])
                        .then(([productToEdit, category, subcategory]) => {
                              res.render("admin/product-create", {
                                    category,
                                    subcategory,
                                    errors: errors.mapped(),
                                    old: req.body,
                                    session: req.session,
                              });
                        })
                        .catch((error) => console.log(error));
            }
      },
      edit: (req, res) => {
            const PRODUCT_ALL = Product.findByPk(req.params.id, {
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            });
            const CATEGORY_ALL = Category.findAll({
                  include: [{ association: "subcategories" }],
            });
            const SUBCATEGORY_ALL = Subcategory.findAll({
                  include: [{ association: "products" }, { association: "category" }],
            });

            Promise.all([PRODUCT_ALL, CATEGORY_ALL, SUBCATEGORY_ALL])
                  .then(([productToEdit, category, subcategory]) => {
                        res.render("admin/product-edit", { productToEdit, category, subcategory, session: req.session });
                  })
                  .catch((error) => console.log(error));
      },
      update: (req, res) => {
            const errors = validationResult(req);
            const ID_PRODUCT = req.params.id;
            if (errors.isEmpty()) {
                  Product.update(
                        {
                              name: req.body.name,
                              price: req.body.price,
                              discount: req.body.discount,
                              description: req.body.description,
                              idSubCategory: req.body.subcategory,
                              sold: req.body.sold,
                              stock: req.body.stock,
                        },
                        { where: { idProduct: ID_PRODUCT } }
                  ).then((result) => {
                        if (result) {
                              if (!req.file) {
                                    return res.redirect("/admin/products");
                              } else {
                                    procedures.deleteImage(ID_PRODUCT);
                                    Image.update({ name: req.file.filename }, { where: { idProduct: ID_PRODUCT } });
                                    return res.redirect("/admin/products");
                              }
                        }
                  });
            } else {
                  const PRODUCT_ALL = Product.findByPk(req.params.id, {
                        include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
                  });
                  const CATEGORY_ALL = Category.findAll({
                        include: [{ association: "subcategories" }],
                  });
                  const SUBCATEGORY_ALL = Subcategory.findAll({
                        include: [{ association: "products" }, { association: "category" }],
                  });
                  Promise.all([PRODUCT_ALL, CATEGORY_ALL, SUBCATEGORY_ALL])
                        .then(([productToEdit, category, subcategory]) => {
                              res.render("admin/product-edit", {
                                    productToEdit,
                                    category,
                                    subcategory,
                                    errors: errors.mapped(),
                                    old: req.body,
                                    session: req.session,
                              });
                        })
                        .catch((error) => console.log(error));
            }
      },
      destroy: (req, res) => {
            // obtengo el id del req.params
            const PRODUCT_ID = req.params.id;
            procedures.deleteImage(PRODUCT_ID);

            Image.destroy({
                  where: {
                        idProduct: PRODUCT_ID,
                  },
            });
            Product.destroy({
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],

                  where: {
                        idProduct: PRODUCT_ID,
                  },
            })
                  .then(() => {
                        return res.redirect("/admin/products");
                  })
                  .catch((error) => console.log(error));
      },
};
