const { Product,Images, Category,Subcategory, Sequelize } = require("../database/models");
const { Op } = Sequelize;
const { validationResult } = require("express-validator");
module.exports = {
      index: (req, res) => {
            Product.findAll({
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            })
            return res.render("admin/adminIndex", { session: req.session });
      },
      products: (req, res) => {
            Product.findAll({
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            })
            .then((products)=>{
                              return res.render("admin/adminproducts",  { products,session: req.session });
            })
      },
      create: (req, res) => {
            const PRODUCT_ALL = Product.findByPk(req.params.id, {
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            });
            const CATEGORY_ALL = Category.findAll({
                  include: [{ association: "subcategories"}],
            });
            const SUBCATEGORY_ALL = Subcategory.findAll({
                  include: [{association:"products"}, { association: "category"}],
            });


            Promise.all([PRODUCT_ALL, CATEGORY_ALL,SUBCATEGORY_ALL])
            .then(([productToEdit, category, subcategory ]) => {
                  res.render("admin/product-create", { productToEdit, category, subcategory, session: req.session });
                  
            })
                  .catch((error) => console.log(error));
      },
      store: (req, res) => {
            /* Otra forma de sacar el id mas grande */
            /* let lastId = Math.max(...dbProducts.map(product => product.id)); */
            
            const errors = validationResult(req);
            if (errors.isEmpty()) {

                        Product.create({
                        name:req.body.name,
                        price:req.body.price,
                        discount:req.body.discount,
                        description:req.body.description,
/*                         category:req.body.category,
 */                     idSubCategory:req.body.subcategory,
/*                         image:req.file ? req.file.filename : "default-image.png",
 */                        sold:req.body.sold,
                        stock:req.body.stock,
                        })
                        Product.findAll({
                              include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
                        }).then((product)=>{
                              return res.send(product)
                              let pp= product.length()
                              let ppp= product[pp].idProduct
                              return res.send(ppp)
                        } )
                        /* Images.create({
                              name:req.file ? req.file.filename : "default-image.png",
                              
                               idProduct:,
                             
                              }) */
                        res.redirect("/admin/products")
                             
                        
                         
                  /* let newProduct = {
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
                  return res.redirect("/"); */
            } else {
                  res.render("admin/product-create", {
                        /* dbcategory: readJSON("categorys.json"),
                        dbSubCategory: readJSON("subCategorys.json"), */
                        errors: errors.mapped(),
                        old: req.body,
                        session: req.session,
                  });
            }
      },
      edit: (req, res) => {
            
            const PRODUCT_ALL = Product.findByPk(req.params.id, {
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
            });
            const CATEGORY_ALL = Category.findAll({
                  include: [{ association: "subcategories"}],
            });
            const SUBCATEGORY_ALL = Subcategory.findAll({
                  include: [{association:"products"}, { association: "category"}],
            });


            Promise.all([PRODUCT_ALL, CATEGORY_ALL,SUBCATEGORY_ALL])
            .then(([productToEdit, category, subcategory ]) => {
                  res.render("admin/product-edit", { productToEdit, category, subcategory, session: req.session });
                  
            })
                  .catch((error) => console.log(error));
            /*let productId = Number(req.params.id);
            let productToEdit = dbProducts.find((product) => {
                  return product.id === productId;
            });
            res.render("admin/product-edit", { productToEdit, session: req.session });*/
      },
      update: (req, res) => {
            const errors = validationResult(req);
            const ID_PRODUCT= req.params.id;
            
            if (errors.isEmpty()) {
                  Product.update({
                              name : req.body.name,
                              price : req.body.price,
                              discount : req.body.discount,
                              description : req.body.description,
                              category : req.body.category,
                              subcategory : req.body.subcategory,
                              image : req.file ? req.file.filename : product.image,
                              sold : req.body.sold,
                              stock : req.body.stock,
                        })
                  res.redirect("/")
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
            const PRODUCT_ID = req.params.id;
            
            Images.destroy({
                  where: {
                  idProduct:PRODUCT_ID
            }
      })
            Product.destroy({
                  include: [{ association: "subcategory", include: [{ association: "category" }] }, { association: "images" }],
 
                  where: {
                        idProduct:PRODUCT_ID
                  }
            })
            .then(()=>{
                  return res.redirect("/admin/products");
            })
            .catch((error=>console.log(error)))            
            
            // busco el producto a eliminar y lo borro del array
           /*  dbProducts.forEach((product) => {
                  if (product.id === productId) {
                        let productToDestroy = dbProducts.indexOf(product);
                        dbProducts.splice(productToDestroy, 1);
                  }
            });

            writeJSON("products.json", dbProducts);
            res.redirect("/"); */
      },
};
