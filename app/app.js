const express = require("express");
const path = require("path");
const app = express();
const PORT = 3030;

app.listen(PORT, () =>
      console.log(`Servidor funcionando en puerto ${PORT}
http://localhost:${PORT}`)
);
app.use(express.static("public"));

/* HOME */
app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "./views/home.html"));
});

/* CARRITO */
app.get("/carrito", (req, res) => {
      res.sendFile(path.join(__dirname, "./views/carrito.html"));
});

/* CARRITO */
app.get("/descripcion", (req, res) => {
      res.sendFile(path.join(__dirname, "./views/descripcion.html"));
});
