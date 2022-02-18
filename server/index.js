var express = require('express');

var routesAlbum = require('./routes/routesAlbum')
var routesUser=require('./routes/routesUser')
var routesPlaylist=require('./routes/routesPlaylist')
var routesMusic=require('./routes/routesUser')
var routesCategoryGender=require('./routes/routesCategoryGender')


var app=express();

const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use("/api/album",routesAlbum)
app.use("api/user",routesUser)
app.use("/api/music",routesMusic)
app.use("api/playlist",routesPlaylist)
app.use("/api/category",routesCategoryGender)



app.listen(3000,()=>{
    console.log('listening on port 3000')
})