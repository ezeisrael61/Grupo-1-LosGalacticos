const router = require("express").Router();
const { store, update, destroy } = require("../../controllers/api/categoriesControllers");

router.post("/categories/create", store);
router.put("/categories/update/:id", update);
router.delete("/categories/delete/:id", destroy);

module.exports = router;
