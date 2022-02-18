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
    db.db.query(`SELECT songs FROM playlist WHERE id = ?`, req.body.id_playlist, (err, rez) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(rez);
        }
    });
};




// Posting a Song in Playlist Is like Updating the array in the Playlist table For Specfic user










module.exports = {
    removefrompl,
    GetPlaylistSong,
    updateplname,
   
};
