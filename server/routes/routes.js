var router = require("express").Router();
const controllers = require("../controllers/controllers");
router.get("/get",controllers.GetAllSong)

router.post("/register", controllers.register);
router.post("/getuser", controllers.getuser);
router.post("/login", controllers.login);
router.put("/updateuser/:id", controllers.updateUser);
router.get("/getUserInfo/:id", controllers.getUserInfo);
router.get("/get", controllers.GetAllSong);





//just test for pushing github
router.get("/get",controllers.GetAllSong)
router.put("/delete/:id", controllers.removefrompl);
router.get("/get/:id",(req,res)=>{
console.log(req.params.id);
    controllers.GetPlaylistSong(req.params.id,(a,b)=>{
        res.send(a)
    })
})
router.get("/getsongs/:id",(req,res)=>{
    console.log(req.params.id," req.body")
    controllers.GetSong(req.params.id,(a,b)=>{
        console.log(a," ",b)

     
        res.send(a);
    })
})


router.post("/post", (req, res) => {
    controllers.PostSongs(req.body, (a, b) => {
console.log(a," ", b)
        if (a) {

res.send(a)
        }
        else 
        res.send(b)
    });
  });
  

router.put("/updateplname", controllers.updateplname);
module.exports = router;
