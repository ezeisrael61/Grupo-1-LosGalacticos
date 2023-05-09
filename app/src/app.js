const express = require("express");
const path = require("path");
const app = express();
const PORT = 3060;
const methodOverride = require("method-override"); // Para poder usar los métodos PUT y DELETE
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cookieCheck = require("./middlewares/cookieCheck");

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Para poder usar el metodo POST
app.use(express.static("public")); //
app.use(methodOverride("_method")); // Para poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(
      session({
            secret: "Pico y Pala",
            resave: false,

            saveUninitialized: true,
      })
);
app.use(cookieParser());
app.use(cookieCheck);

/*  Template Engine */
/* Necesario para usar los templates antes instalar npm i  ejs */
app.set("view engine", "ejs");
app.set("views", "./src/views");

/* ROUTERS */
const homeRouter = require("./routes/home");
const productosRouter = require("./routes/productos");
const usuariosRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const categoriesRoutesApi = require("./routes/api/categoriesRoutes");
const subCategoriesRoutesApi = require("./routes/api/subCategoriesRoutes");

/* MIDDLEWARES ROUTES */
app.use("/", homeRouter);
app.use("/productos", productosRouter);
app.use("/users", usuariosRouter);
app.use("/admin", adminRouter);
app.use("/api/v1", categoriesRoutesApi);
app.use("/api/v1", subCategoriesRoutesApi);

app.listen(PORT, () =>
      console.log(`Servidor funcionando en puerto ${PORT} 
http://localhost:${PORT}`)
);
