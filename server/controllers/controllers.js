var db = require("../DataBase/Connection.js");
const {signupValidation, loginValidation} = require("./validation");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
                   var params={
                     username:req.body.name,
                     email: req.body.email,
                     password:hash,
                     last_login:req.body.date
                   }
                    db.query(`INSERT INTO user Set ? `
                      , params ,(err, result) => {
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


const login = (loginValidation, (req, res, next) => {
    db.query(`SELECT * FROM user WHERE email = ${
        db.escape(req.body.email)
    };`, (err, result) => { // user does not exists
        if (err) {
            return res.status(400).send({msg: err});
        }
        if (!result.length) {
            return res.status(401).send( "Email or password is incorrect!");
        }
        // check password
        bcrypt.compare(req.body.password, result[0]["password"], (bErr, bResult) => { // wrong password
            if (bErr) {
                return res.status(401).send( "Email or password is incorrect!");
            }
            if (bResult) {
                const token = jwt.sign({
                    id: result[0].id
                }, "the-super-strong-secrect", {expiresIn: "1h"});
                db.query(`UPDATE user SET last_login = now() WHERE id = '${
                    result[0].id
                }'`);
                return res.status(200).send({msg: "Logged in!", token, user: result[0]});
            }
            return res.status(401).send( "Username or password is incorrect!");
        });
    });
});
const getuser = (signupValidation, (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer") || !req.headers.authorization.split(" ")[1]) {
        return res.status(422).json({message: "Please provide the token"});
    }
    const theToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(theToken, "the-super-strong-secrect");
    db.db.query("SELECT * FROM user where id=?", decoded.id, function (error, results, fields) {
        if (error) 
            throw error;
        
        return res.send({error: false, data: results[0], message: "Fetch Successfully."});
    });
});

var db = require("../DataBase/Connection.js");
const e = require("express");
// testing
const removefrompl = (req, res) => {
    console.log(req.params, "fssfss", req.body);
    var selsql = `SELECT songs FROM playlist WHERE id = ${
        req.params["id"]
    } `;
    db.db.query(selsql, (err, result) => {
        if (err) {
            res.send("err1");
        }

        var parse = JSON.parse(result[0]["songs"]);
        // console.log(parse,"af")

        for (var i = 0; i < parse.length; i++) {
            if (parse[i] === req.body["idsong"]) {
                parse.splice(i, 1);
            }
        }
        parse = JSON.stringify(parse);
        var upsql = `UPDATE playlist SET songs = '${parse}' WHERE id = '${
            req.params["id"]
        }' `;
        db.db.query(upsql, (err, resl) => {
            if (err) {
                res.send("err2");
            }
            res.send(resl);
        });
    });
};
const updateplname = (req, res) => {
    var selsql = `UPDATE playlist SET name = ?  WHERE id = ?  `;
    db.db.query(selsql, [
        req.body["name"], req.body["id"]
    ], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.send(result);
    });
};

// Getting The Array of Song for Specfic user
const GetPlaylistSong = function (User, callback) {
    db.db.query(`SELECT songs FROM playlist WHERE id = '${User}'`, (err, rez) => {
        if (err) 
            callback(null);
         else 
            callback(rez);
        
    });
};

// Posting a Song in Playlist Is like Updating the array in the Playlist table For Specfic user
var PostSongs = function (Data, callback) {
    db.db.query(`select * from playlist where id ='${
        Data["user"]
    }' `, (err, rez) => {
        if (err) 
            callback("err in finding the user");
         else {
            var x = [];
            var arr = [];
            arr.push(JSON.parse(Data["songs"]));
            console.log(rez, " rez", rez["0"]["songs"]);
            x = JSON.parse(rez["0"]["songs"]);

            arr = arr.concat(x);
            var arr1 = [];
            arr = JSON.stringify(arr);
            console.log(arr, "this is the Array ");
            db.db.query(`UPDATE playlist SET songs = '${arr}' WHERE id ='${
                Data["user"]
            }' `, (err, rez) => {
                if (rez.affectedRows == 0) {
                    db.db.query(`INSERT INTO playlist (id , songs) VALUES ('${
                        Data["user"]
                    }' , '${arr}')`, (err1, rez1) => {
                        if (err1 !== null) 
                            callback("Err Ha");
                         else 
                            callback("Check Data Inserted");
                        
                    });
                } else {
                    if (err !== null) 
                        callback("err Hapaned");
                     else 
                        callback("Check Database");
                    
                }
            });
        }
    });
};
const GetSong = function (User, callback) {
    console.log(User, "this is the user ");
    db.db.query(`SELECT * FROM songs WHERE id = '${User}'`, (err, rez) => {
        console.log(err, " this is The Data ", rez);
        if (err) 
            callback(null);
         else 
            callback(rez);
        
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

const updateUser = (req, res) => { // const params=req.params.id
    console.log(req.params["id"], " that is the params");
    console.log(req.body, " that is the body ");

    const up = `UPDATE user SET username= '${
        req.body["username"]
    }' , email= '${
        req.body["email"]
    }' , password='${
        req.body["password"]
    }' WHERE id='${
        req.params["id"]
    }'`;
    console.log(req.params.id);
    // var sql = 'UPDATE `users` SET `furniture` = ' + `concat(furniture, '${lol}')` + 'WHERE `user` = ?'
    db.db.query(up, (err, data) => {
        console.log(data);
        if (err) {
            console.log("error in update");
            res.send(err);
        } else {
            console.log("data updated");
            res.send(data);
        }
    });
};

// Posting a Song in Playlist Is like Updating the array in the Playlist table For Specfic user

const getUserInfo = (req, res) => { // const id=req.params.id
    const userInfo = `SELECT * FROM user WHERE id = '${
        req.params["id"]
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

module.exports = {
    removefrompl,
    GetPlaylistSong,
    updateplname,
    PostSongs,
    register,
    GetAllSong,
    login,
    GetAllSong,
    getuser,
    GetSong,
    updateUser,
    getUserInfo,
    GetAllSong
};
