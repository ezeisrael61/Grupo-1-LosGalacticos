const { Category } = require("../database/models");

module.exports = {
      list: (req, res) => {
            Category.findAll().then((categorias) => {
                  return res.render("admin/adminCategories", { categorias, session: req.session });
            });
      },
};
