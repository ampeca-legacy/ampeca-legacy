var router = require("express").Router();
const controllers = require("../controllers/controllerAlbum");

router.post("/addAlbum",controllers.addAlbum)
router.delete("/delete/:id_album",controllers.deleteAlbum)
router.put("/update/:id_album", controllers.updateAlbum);
router.get("/getalbum/:id_user",controllers.getAlbumsByUser)
router.get("/getmusic/:id_album",controllers.getMusicFromAlbum)

//just test for pushing github



module.exports = router;
