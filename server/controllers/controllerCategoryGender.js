var db = require("../DataBase/Connection.js");

// Posting a Song in Playlist Is like Updating the array in the Playlist table For Specfic user

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
    
    getGenders,
    getAlbumsByGender,
   
};
