var db = require("../DataBase/Connection.js");

const removefrompl = (req, res) => {
    id = req.params.id_playlist

    var sql = `delete FROM playlist WHERE id_playlist = ?`;
    db.query(sql, id, (err, result) => {
        if (err) {
            res.send("err1");
        } else {
            res.send(result);
        }
    });

};

const updateplname = (req, res) => {
    var sql = `UPDATE playlist SET name = ?  WHERE id = ?  `;
    db.query(sql, [req.body["name_playlist"], req.body["id_playlist"]], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }

    });
};

// Getting The Array of Song for Specfic user
const GetPlaylistSong = function (req, res) {
    db.query(`SELECT pm.*,m.*,p.* FROM playlist_music pm inner join music m on m.id_music=pm.id_music inner join playlist p on p.id_playlist=pm.id_playlist WHERE pm.id_playlist = ?`, req.params.id_playlist, (err, rez) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(rez);
        }
    });
};

const addPl=(req,res)=>{
    var instsql='INSERT INTO playlist SET ?';
    var params ={
        id_user :req.body.id_user,
        name_playlist:req.body.name_playlist
    }
    db.query(instsql,params,(err,resl)=>{
        if(err){
            res.send(err)
        }
        res.send(resl)
    })
}
var addMusicToPlaylist =(req,res)=>{
    var params={
        id_music:req.body.id_music,
        id_playlist:req.body.id_playlist
    }
    sql='insert into playlist_music set ?'
    db.query(sql,params,(err,result)=>{
        if (err) console.log(err)
        else res.send (result);
    })
}

// Posting a Song in Playlist Is like Updating the array in the Playlist table For Specfic user










module.exports = {
    removefrompl,
    GetPlaylistSong,
    updateplname,
    addPl,
    addMusicToPlaylist
};
