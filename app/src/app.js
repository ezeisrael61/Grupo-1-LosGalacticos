const express = require("express");
const path = require("path");
const app = express();
const PORT = 3030;

app.use(express.static("public"));

/*  Template Engine */
app.set("view engine", "ejs");
app.set("views", "./src/views");

/* ROUTERS */
const homeRouter = require("./routes/home");
const productosRouter = require("./routes/productos");
const usuariosRouter = require("./routes/usuarios");

/* MODDLEWARES ROUTES */
app.use("/", homeRouter);
app.use("/productos", productosRouter);
app.use("/usuarios", usuariosRouter);

app.listen(PORT, () =>
      console.log(`Servidor funcionando en puerto ${PORT} 
http://localhost:${PORT}`)
);

/* CARRITO */

/* app.get("/carrito", (req, res) => {
      res.sendFile(path.join(__dirname, "../views/carrito.html"));
}); */

/* DESCRIPCION */
/* app.get("/descripcion", (req, res) => {
      res.sendFile(path.join(__dirname, "../views/descripcion.html"));
}); */

/* BUSQUEDA */
/* app.get("/buscador", (req, res) => {
      res.sendFile(path.join(__dirname, "../views/buscador.html"));
}); */

/* LOGIN */
/* app.get("/login", (req, res) => {
      res.sendFile(path.join(__dirname, "../views/login.html"));
}); */

/* REGISTRO */
/* app.get("/registro", (req, res) => {
      res.sendFile(path.join(__dirname, "../views/registro.html"));
}); */
