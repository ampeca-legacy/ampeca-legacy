var router = require("express").Router();
const controllers = require("../controllers/controllerAlbum");

router.post("/addAlbum",controllers.addAlbum)
router.delete("/delete/album/:id",controllers.deleteAlbum)
router.put("/update/album/:id", controllers.updateAlbum);

//just test for pushing github



module.exports = router;
