var router = require("express").Router();
const controllers = require("../controllers/controllerPlaylist");

router.put("/delete/:id_playlist", controllers.removefrompl);
router.get("/getplaylistmusic/:id_playlist", controllers.GetPlaylistSong)
router.put("/updateplname", controllers.updateplname);
router.post("/addplaylist", controllers.addPl)
router.post("/addmusictoplaylist", controllers.addMusicToPlaylist)

module.exports = router;
