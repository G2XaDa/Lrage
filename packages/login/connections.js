var mysql = require("mysql");

var connection  = mysql.createConnection({
  host          : "localhost",
  user          : "root",
  password      : "",
  database      : "ragemp"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

var sql = "CREATE TABLE players (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, scID int NOT NULL UNIQUE, posX int NOT NULL, posY int NOT NULL, posZ int NOT NULL, isAdmin BOOLEAN DEFAULT false)";

  connection.query(sql, function (err, result) {
    if (err) {
      console.log('The following error happened while creating [players]: ' + err);  
      throw err;
    }
    console.log("[players] has been created");
});

exports.connection = connection