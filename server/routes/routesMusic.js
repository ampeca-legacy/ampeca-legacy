var router = require("express").Router();
const controllers = require("../controllers/controllersMusic");

router.get("/get",controllers.GetAllSong)

router.get("/getsongs/:id_user",controllers.GetSong)

router.post("/post",controllers.PostMusic);
 
module.exports = router;
