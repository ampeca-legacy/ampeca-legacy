var db = require("../DataBase/Connection.js");

var getMusicFromAlbum = (req, res) => {
    var params = req.params.id_album
    var sql = 'select * from music where id_album=?'
    db.query(sql, params, (err, rez) => {
        if (err)
            res.send(err);
        else
            res.send(rez);
    });
}
var addAlbum=(req,res)=>{
    var instsql='INSERT INTO album SET ?';
    var params={
     gender_album:req.body.gender,
     category_album:req.body.category,
     name_album:req.body.name,
     cover_album:req.body.cover,
     descr_album:req.body.descr,
     id_user:req.body.userid
    }
    db.query(instsql,params,(err,resl)=>{
        if(err){
            res.send(err)
        }
        res.send(resl)
    })
 }
 var deleteAlbum=(req,res)=>{
   var delsql=`DELETE FROM album WHERE id_album=${req.params.id}`
   db.query(delsql,(err,resl)=>{
       if(err){
         res.send(err)
       }
       res.send(resl)
   })
 }
 var updateAlbum=(req,res)=>{
     var instsql=`UPDATE album SET ? WHERE id_album=${req.params.id}`;
     var params={
         gender_album:req.body.gender,
         category_album:req.body.category,
         name_album:req.body.name,
         cover_album:req.body.cover,
         descr_album:req.body.descr,
         id_user:req.body.userid
        }
     db.query(instsql,params,(err,resl)=>{
         if(err){
             res.send(err)
         }
         res.send(resl)
     })
 }
module.exports = {
    addAlbum,
    updateAlbum,
    deleteAlbum,
    getMusicFromAlbum,   
};
