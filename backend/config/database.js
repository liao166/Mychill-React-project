const mysql = require("mysql");

exports.exec = (sql, data, callback) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "chill_around",
    multipleStatements: true,
  });
  connection.connect();

  connection.query(sql, data, function (error, results, fields) {
    if (error) {
      console.log("Error connecting to the database:", error);
    }
    console.log("Connected to the database.");
    callback(null, results, fields);
  });
  connection.end();
};
