const mysql = require("mysql");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "admin123",
  database: "education",
});

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "admin123",
  database: "education",
});

connection.connect((err) => {
  if (err) {
    console.log("Connection Error" + err.stack);
    return;
  }
  console.log("Successfuly Connect ");
});

connection.end();

// db.query("select 1", (err, result) => {
//   if (err) {
//     return console.log(err.message);
//   }
//   console.log(result);
// });

// const sqlStr = "select * from users";

// db.query(sqlStr, (err, result) => {
//   if (err) {
//     console.log(err.message);
//   }
//   console.log(result);
// });

// const user = {
//   username: "test",
//   password: "1234",
//   firstname: "Testing",
//   lastname: "Test",
// };
// const sqlStr1 =
//   "insert into education.users SET ?;
// db.query(
//   sqlStr1,user,
//   (err, result) => {
//     if (err) {
//       console.log(err.message);
//     }
//     if (result.affectedRows === 1) {
//       console.log("Data insert sucessfuly");
//     }
//   }
// );

const user = {
  id: 2,
  username: "test",
  password: "0012",
};

const sqlStr2 = "update users set ? where id=?";

db.query(sqlStr2, [user, user.id], (err, result) => {
  if (err) return console.log(err.message);
  if (result.affectedRows === 1) console.log("Update Succesful");
});
