var db = require("../DataBase/Connection.js");

const bcrypt = require("bcryptjs");



const register = function (req, res) {
    var sql = 'SELECT * FROM user WHERE LOWER(email) = LOWER(?)'
    console.log(req.body)
    db.query(sql, [req.body.email], (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result.length) {
                res.status(200).send("This user is already in use!");
            } else
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    var params = {
                        username: req.body.name,
                        email: req.body.email,
                        password: hash,
                        last_login: req.body.date
                    }
                    db.query(`INSERT INTO user Set ? `
                        , params, (err, result) => {
                            if (err) {
                                throw err
                            } else {
                                res.status(201).send("The user has been registerd with us!")
                            }
                        })
                })
        }

    })
}


const login = (req, res, next) => {
    params = req.body
    sql = 'SELECT * FROM user WHERE email =?'
    db.query(sql, [params.email], (err, result) => { // user does not exists
        if (err) {
            res.status(400).send(err);
        } else if (!result.length) {
            res.status(401).send("Email or password is incorrect!");
        } else {
            bcrypt.compare(params.password, result[0]["password"], (bErr, bResult) => { // wrong password
                if (bErr) {
                    res.status(401).send("Email or password is incorrect!");
                }
                if (bResult) {
                    res.status(200).send("Logged in!", result[0]);
                } else {
                    res.status(401).send("Username or password is incorrect!");
                }
            })
        }
    });
};

// const getuser =  (req, res, next) => {
//     if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer") || !req.headers.authorization.split(" ")[1]) {
//         return res.status(422).json({ message: "Please provide the token" });
//     }
//     const theToken = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(theToken, "the-super-strong-secrect");
//     db.db.query("SELECT * FROM user where id=?", decoded.id, function (error, results, fields) {
//         if (error)
//             throw error;

//         return res.send({ error: false, data: results[0], message: "Fetch Successfully." });
//     });
// }


// testing
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
    db.query("SELECT * FROM song where id_music=?", req.params.id_music, (err, items, fields) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(items);
        }
    });
};

var GetAllSong = function (req, res) {
    db.db.query("SELECT * FROM music ", (err, rez) => {
        if (err)
            res.send(err);
        else
            res.send(rez);

    });
};

// const updateUser = (req, res) => { // const params=req.params.id
//     console.log(req.params["id"], " that is the params");
//     console.log(req.body, " that is the body ");

//     const up = `UPDATE user SET username= '${req.body["username"]
//         }' , email= '${req.body["email"]
//         }' , password='${req.body["password"]
//         }' WHERE id='${req.params["id"]
//         }'`;
//     console.log(req.params.id);
//     // var sql = 'UPDATE `users` SET `furniture` = ' + `concat(furniture, '${lol}')` + 'WHERE `user` = ?'
//     db.db.query(up, (err, data) => {
//         console.log(data);
//         if (err) {
//             console.log("error in update");
//             res.send(err);
//         } else {
//             console.log("data updated");
//             res.send(data);
//         }
//     });
// };

// Posting a Song in Playlist Is like Updating the array in the Playlist table For Specfic user

const getUserInfo = (req, res) => { // const id=req.params.id
    const userInfo = `SELECT * FROM user WHERE id = '${req.params["id_user"]
        }'`;
    db.db.query(userInfo, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
};
var GetAllSong = function (req, res) {
    db.db.query("SELECT * FROM songs ", (err, rez) => {
        if (err)
            res.send(err);
        else
            res.send(rez);

    });
};
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

var getGenders=(req,res)=>{
    
    var sql = 'select gender from album'
    db.query(sql, (err, rez) => {
        if (err)
            res.send(err);
        else{
            var obj={}
            for (var i=0;i<rez.length;i++){
                if (obj[rez[i]])
                obj[rez[i]]++
                else{
                    obj[rez[i]]=1
                }
            }
            var array=[]
            for (var key in obj){
                array.push(key)
            }
            res.send(array);
        }
            

    });
}
var getAlbumsByGender=(req,res)=>{
    var params=req.params.gender
    var sql='select * from album where gender_album=?'
    db.query(sql,params,(err,res)=>{
        if (err)
        res.send(err);
        else
        res.send(res)
    })
}

module.exports = {
    getMusicFromAlbum,
    getGenders,
    getAlbumsByGender,
    removefrompl,
    GetPlaylistSong,
    updateplname,
    PostMusic,
    register,
    GetAllSong,
    login,
    GetAllSong,
    // getuser,
    GetSong,
    // updateUser,
    getUserInfo,
    GetAllSong
};
