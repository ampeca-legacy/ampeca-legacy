var db = require("../DataBase/Connection.js");


var PostMusic = function (req, res) {
    var lecture = "INSERT INTO music SET ?"
    var params = {
        url_music: req.body.url_music,
        name_music: req.body.name_music,
        id_user: req.body.id_user,
        id_album: req.body.id_album,
        descr_music: req.body.descr_music
    }
    db.query(lecture, params, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            res.send(results)
        }
    })
}

var GetSong = function (req, res) {
    db.query("SELECT * FROM music where id_user=?", req.params.id_user, (err, items, fields) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(items);
        }
    });
};

// for home page
var GetAllSong = function (req, res) {
    db.query("SELECT * FROM music ", (err, rez) => {
        if (err)
            res.send(err);
        else
            res.send(rez);
    });
};



// Posting a Song in Playlist Is like Updating the array in the Playlist table For Specfic user


var GetsearchedSong = function (req, res) {

    db.query("SELECT m.*,a.*,u.* FROM music m inner join album a on m.id_album=a.id_album inner join user u on u.id_user=m.id_user ", (err, rez) => {
        if (err)
            res.send(err);
        else
            res.send(rez);

    });
};




module.exports = {  
    PostMusic,
    GetSong,
    GetAllSong,
    GetsearchedSong
};
