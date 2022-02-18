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


// Getting The Array of Song for Specfic user

// Posting a Song in Playlist Is like Updating the array in the Playlist table For Specfic user






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






module.exports = {
   
    register,
    login,
    // getuser,
    // updateUser,
    getUserInfo,
  
};
