var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "firasj20",
  database: "ampeca",
});

db.connect(() => {
  console.log("Database Connected ");
});

module.exports =db;
