const mysql = require("mysql");

const config = {
  host: "127.0.0.1",
  user: "root",
  password: "admin123",
  database: "education",
};

exports.db = (sql, sqlParams) => {
  sqlParams = sqlParams == null ? [] : sqlParams;
  return new Promise((resolve, reject) => {
    const db = mysql.createPool(config);
    db.getConnection((err, connect) => {
      if (!err) {
        connect.query(sql, sqlParams, (e, results) => {
          if (!e) {
            console.log(results);
            resolve(results);
            connect.destroy();
          } else {
            console.log("sql", e);
            reject(e);
          }
        });
      } else {
        console.log("connect err:", err);
        reject(err);
      }
    });
  });
};

// app.get("/adduser", (req, resp) => {
//   const db = mysql.createPool(config);
//   db.getConnection((err, connect) => {
//     if (!err) {
//       const sql = "insert into education.users set ?";
//       const sqlParams = {};
//       connect.query(sql, sqlParams, (e, results) => {
//         if (!e) {
//           console.log(results);
//           resp.send(results);
//         }
//       });
//     } else {
//       console.log("err:", err);
//     }
//   });
// });
