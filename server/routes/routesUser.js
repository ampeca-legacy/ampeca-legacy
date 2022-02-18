var router = require("express").Router();
const controllers = require("../controllers/controllersUser");


router.post("/register", controllers.register);// for signup
// router.post("/getuser", controllers.getuser); // 
router.post("/login", controllers.login);
// router.put("/updateuser/:id", controllers.updateUser);
router.get("/getUserInfo/:id", controllers.getUserInfo);

//just test for pushing github



module.exports = router;
