var router = require("express").Router();
const controllers = require("../controllers/controllerCategoryGender");

router.get("/getgender",controllers.getGenders)
router.get("/getalbum",controllers.getAlbumsByGender)

module.exports = router;
