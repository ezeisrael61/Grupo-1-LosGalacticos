const fs = require("fs");

const dbProducts = JSON.parse(fs.readFileSync("./src/database/products.json", "utf-8"));
module.exports = dbProducts;
