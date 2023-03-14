const express = require("express");
const path = require("path");
const app = express();
const PORT = 3060;
const methodOverride = require("method-override"); // Para poder usar los métodos PUT y DELETE
const session = require('express-session')


app.use(express.urlencoded({ extended: false })); // Para poder usar el metodo POST
app.use(express.static("public")); //
app.use(methodOverride("_method")); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({
      secret: 'Pico y Pala',
      resave: false,
      saveUninitialized: true
}))

/*  Template Engine */
/* Necesario para usar los templates antes instalar npm i  ejs */
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
