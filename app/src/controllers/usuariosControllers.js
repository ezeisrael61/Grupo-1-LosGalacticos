const { validationResult } = require("express-validator");
const { readJSON, writeJSON } = require("../database");

const dbUsers = readJSON("users.json");

module.exports = {
      login: (req, res) => {
            return res.render("users/login", { session: req.session });
      },
      storeLogin: (req, res) => {
            let errors = validationResult(req);
            if (errors.isEmpty()) {
                  let user = dbUsers.find((user) => user.email === req.body.email);
                  req.session.user = {
                        id: user.id,
                        name: user.firstName,
                        avatar: user.avatar,
                        typeOfAccess: user.typeOfAccess,
                  };
                  /* Se le asigna la session a local para que lo pueda ver des las vistas ejs */
                  res.locals.user = req.session.user;

                  if (req.body.recordar) {
                        //*********Guarar Cookie con tiempo de expiracion 1 hora************
                        let duracionSesion = new Date(Date.now() + 90000);
                        res.cookie("user", req.session.user, { expires: duracionSesion, httpOnly: true });
                  }

                  res.redirect("/");
            } else {
                  return res.render("users/login", {
                        errors: errors.mapped(),
                        old: req.body,
                        session: req.session,
                  });
            }
      },
      logout: (req, res) => {
            req.session.destroy();
            if (req.cookies.user) {
                  //Elimina la cookies poniendo tiempo de expiracion -1
                  res.cookie("user", "", { maxAge: -1 });
            }
            return res.redirect("/");
      },
      register: (req, res) => {
            return res.render("users/registro", { session: req.session });
      },
      store: (req, res) => {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                  let lastId = dbUsers[dbUsers.length - 1].id;
                  let newUser = {
                        id: lastId + 1,
                        firstName: req.body.nombre,
                        lastName: req.body.apellido,
                        email: req.body.email,
                        password: req.body.pass,
                        avatar: req.file ? req.file.filename : "defauld.png",
                        typeOfAccess: "user",
                  };
                  dbUsers.push(newUser);
                  writeJSON("users.json", dbUsers);
                  return res.redirect("/usuarios/login");
            } else {
                  res.render("users/registro", {
                        errors: errors.mapped(),
                        old: req.body,
                        session: req.session,
                  });
            }
      },
};
