var router = require("express").Router();
const controllers = require("../controllers/controllerPlaylist");



router.put("/delete/:id", controllers.removefrompl);
router.get("/get/:id",controllers.GetPlaylistSong)
router.put("/updateplname", controllers.updateplname);
module.exports = router;
