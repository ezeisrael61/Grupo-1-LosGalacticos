const express = require("express");
const path = require("path");
const app = express();
const PORT = 3030;
const homeRouter = require("./routes/home");
app.listen(PORT, () =>
      console.log(`Servidor funcionando en puerto ${PORT} 
http://localhost:${PORT}`)
);
app.use(express.static("public"));

/* HOME */
app.use("/", homeRouter);

/* CARRITO */
app.get("/carrito", (req, res) => {
      res.sendFile(path.join(__dirname, "../views/carrito.html"));
});

/* DESCRIPCION */
app.get("/descripcion", (req, res) => {
      res.sendFile(path.join(__dirname, "../views/descripcion.html"));
});
/* LOGIN */
app.get("/login", (req, res) => {
      res.sendFile(path.join(__dirname, "../views/login.html"));
});

/* REGISTRO */
app.get("/registro", (req, res) => {
      res.sendFile(path.join(__dirname, "../views/registro.html"));
});
/* BUSQUEDA */
app.get("/buscador", (req, res) => {
      res.sendFile(path.join(__dirname, "../views/buscador.html"));
});
