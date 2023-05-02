const router = require("express").Router();
const { store, update, destroy } = require("../../controllers/api/subCategoriesControllers");

router.post("/subCategories/create", store);
router.put("/subCategories/update/:id", update);
router.delete("/subCategories/delete/:id", destroy);

module.exports = router;
