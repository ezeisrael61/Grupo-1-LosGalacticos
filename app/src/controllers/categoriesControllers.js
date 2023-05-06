const { Category } = require("../database/models");
const fetch = require("node-fetch");

module.exports = {
      lists: (req, res) => {
            Category.findAll().then((categorias) => {
                  return res.render("admin/adminCategories", { categorias, session: req.session });
            });
      },
      list: (req, res) => {
            fetch("http://localhost:3060/api/v1/categories/list")
                  .then((response) => response.json()) // Parsear la respuesta JSON
                  .then((categorias) => {
                        res.render("admin/adminCategories", { categorias: categorias.data, session: req.session }); // Renderizar la vista EJS con los datos del producto
                  })
                  .catch((error) => {
                        console.log(error);
                  });
      },
};
