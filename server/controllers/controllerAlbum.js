var db = require("../DataBase/Connection.js");

var getMusicFromAlbum = (req, res) => {
    var params = req.params.id_album
    var sql = 'select m.*,a.*,u.* from music m inner join album a on m.id_album=a.id_album inner join user u on u.id_user=a.id_user where a.id_album=?'
    db.query(sql, [params], (err, rez) => {
        if (err)
            res.send(err);
        else
            res.send(rez);
    });
}
var addAlbum = (req, res) => {
    var instsql = 'INSERT INTO album SET ?';
    var params = {
        gender_album: req.body.gender_album,
        category_album: req.body.category_album,
        name_album: req.body.name_album,
        cover_album: req.body.cover_album,
        descr_album: req.body.descr_album,
        id_user: req.body.id_user
    }
    db.query(instsql, params, (err, resl) => {
        if (err) {
            res.send(err)
        }
        res.send(resl)
    })
}
var deleteAlbum = (req, res) => {
    var delsql = `DELETE FROM album WHERE id_album=${req.params.id_album}`
    db.query(delsql, (err, resl) => {
        if (err) {
            res.send(err)
        }
        res.send(resl)
    })
}
var updateAlbum = (req, res) => {
    var instsql = `UPDATE album SET ? WHERE id_album=${req.params.id_album}`;
    var params = {
        gender_album: req.body.gender_album,
        category_album: req.body.category_album,
        name_album: req.body.name_album,
        cover_album: req.body.cover_album,
        descr_album: req.body.descr_album,
        id_user: req.body.id_user
    }
    db.query(instsql, params, (err, resl) => {
        if (err) {
            res.send(err)
        }
        res.send(resl)
    })
}
var getAlbumsByUser = (req, res) => {
    var sql = 'select * from album where id_user=?'
    db.query(sql,[req.params.id_user], (err, rez) => {
        if (err)
            console.log(err)
        else
            res.send(rez)
    })

}
var getAlbumByCategory=(req,res)=>{
    var sql='select * from album'
    db.query(sql, (err, rez) => {
        if (err)
            console.log(err)
        else{  var obj={}
        for (var i=0;i<rez.length;i++){
            if (obj[rez[i].category_album])
            obj[rez[i].category_album]++
            else{
                obj[rez[i].category_album]=1
            }
        }
        var array=[]
        for (var key in obj){
            array.push(key)
        }
        res.send(array);
    }      
    })
}
var getallalbum=(req,res)=>{
    var sql='select * from album'
    db.query(sql, (err, rez) => {
        if (err)
            console.log(err)
            else res.send(rez)}
    )}

module.exports = {
    getallalbum,
    getAlbumByCategory,
    getAlbumsByUser,
    addAlbum,
    updateAlbum,
    deleteAlbum,
    getMusicFromAlbum,
};
