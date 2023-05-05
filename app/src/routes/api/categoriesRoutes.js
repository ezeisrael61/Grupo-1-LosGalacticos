const router = require("express").Router();
const { list, store, update, destroy } = require("../../controllers/api/categoriesControllers");

router.get("/categories/list", list);
router.post("/categories/create", store);
router.put("/categories/update/:id", update);
router.delete("/categories/delete/:id", destroy);

module.exports = router;
