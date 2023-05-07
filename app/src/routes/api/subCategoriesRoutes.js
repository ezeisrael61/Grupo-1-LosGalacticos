const router = require("express").Router();
const { category, store, update, destroy } = require("../../controllers/api/subCategoriesControllers");

router.get("/subCategories/category/:id", category);
router.post("/subCategories/create", store);
router.put("/subCategories/update/:id", update);
router.delete("/subCategories/delete/:id", destroy);

module.exports = router;
