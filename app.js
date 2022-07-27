const express = require("express");
const util = require("./util");
const app = express();
var { expressjwt: jwt } = require("express-jwt");
const config = require("./config");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(__dirname + "/static"));
// app.use(
//   jwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
//     path: [/^\/api/, /^\//],
//   })
// );

app.use(
  "/apiAuth",
  jwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] })
);

app.use(
  "/studentScore",
  jwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] })
);

const userRouter = require("./router/user");
app.use("/api", userRouter);

const userinfoRouter = require("./router/userinfo");
app.use("/apiAuth", userinfoRouter);

const studentRouter = require("./router/student");
app.use("/apiAuth", studentRouter);

class Resp {
  constructor(code, msg, data, token) {
    this.code = code;
    this.msg = msg;
    this.data = data;
    this.token = token;
  }
  static success(data) {
    return new Resp(200, "Request Sucess", data);
  }
  static loginSuccess(token) {
    return new Resp(201, "Login Sucess", null, token);
  }
  static error(msg) {
    msg = msg ? msg : "Unauthorized User";
    return new Resp(500, msg, null);
  }
  static withoutlogin() {
    return new Resp(501, "Login Require", null);
  }
}

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") return res.send(Resp.error(""));
});

// -----------------------page rounting---------------------------
app.get("/", (req, resp) => {
  util
    .read("/Users/elnerson/Documents/Website/StudentScore/pages/index.html")
    .then((res) => {
      resp.write(res);
      resp.end();
    });
});

app.get("/studentScore", async (req, resp) => {
  const data = await util.read(
    "/Users/elnerson/Documents/Website/StudentScore/pages/studentscore.html"
  );
  resp.end(data);
});

/*
class Resp {
  constructor(code, msg, data, token) {
    this.code = code;
    this.msg = msg;
    this.data = data;
    this.token = token;
  }
  static success(data) {
    return new Resp(200, "Request Sucess", data);
  }
  static loginSuccess(token) {
    return new Resp(201, "Login Sucess", null, token);
  }
  static error(msg) {
    msg = msg ? msg : "Unauthorized";
    return new Resp(500, msg, null);
  }
  static withoutlogin() {
    return new Resp(501, "Login Require", null);
  }
}
// -----------------------data progress---------------------------

// checking user valid
app.get("/getUserByUsername", async (req, resp) => {
  const usern = await user.getUserByUsername(req.query.username);
  if (usern.length > 0) {
    resp.send(Resp.error("User Exist"));
  } else {
    resp.send(Resp.success(null));
  }
});

// User Register
app.post("/register", (req, resp) => {
  let json = req.body;
  let password = crypto
    .createHash("md5")
    .update(json.password + json.username)
    .digest("hex");
  let d = {
    username: json.username,
    password: password,
    firstname: json.firstname,
    lastname: json.lastname,
    email: json.email,
  };
  let userdata = user.add(d);
  resp.send(Resp.success(userdata));
});
// app.post("/register", (req, resp) => {
//   let json = null;
//   req.on("data", (chunk) => {
//     const str = Buffer.from(chunk).toString();
//     json = JSON.parse(str);
//   });
//   req.on("end", async () => {
//     let password = crypto
//       .createHash("md5")
//       .update(json.password + json.username)
//       .digest("hex");
//     let d = {
//       username: json.username,
//       password: password,
//       firstname: json.firstname,
//       lastname: json.lastname,
//       email: json.email,
//     };
//     let userdata = await user.add(d);
//     resp.send(Resp.success(userdata));
//   });
// });

// User Login
app.post("/login", async (req, resp) => {
  let json = req.body;
  // console.log(json.username);
  const u = await user.login(json);
  console.log(u);
  if (u != null) {
    const token = jwt.sign({ username: json.username }, secretkey, {
      expiresIn: "12h",
    });
    const tokenStr = "Bearer" + token;
    resp.send(Resp.loginSuccess(tokenStr));
  } else {
    resp.send(Resp.error("Username/Password Wrong"));
  }
});
// app.post("/login", (req, resp) => {
//   let json = null;
//   req.on("data", (chunk) => {
//     const str = Buffer.from(chunk).toString();
//     json = JSON.parse(str);
//   });
//   req.on("end", async () => {
//     console.log("json:", json);
//     const u = await user.login(json);
//     if (u != null) {
//       req.session.userId = u.id;
//       resp.send(Resp.success(u));
//     } else {
//       resp.send(Resp.error("Username/Password Wrong"));
//     }
//   });
// });
*/
// // Studentinfo
// app.get("/getStudentInfo", async (req, resp) => {
//   const stdd = await student.getallstudentscore();
//   if (stdd.length <= 0) {
//     resp.send(Resp.error("student not found"));
//   } else {
//     resp.send(Resp.success(stdd));
//   }
// });

// //check student Code valid
// app.get("/checkStudentValid", async (req, resp) => {
//   const stdv = await student.checkStudentValid(req.body.studentcode);
//   if (stdv.length > 0) {
//     resp.send(Resp.error("User Exits"));
//   } else {
//     resp.send(Resp.success(null));
//   }
// });

// // add new student
// app.post("/addstudent", async (req, resp) => {
//   let json = req.body;
//   let studentcode = `S${json.studentcode}`;
//   let d = {
//     firstname: json.firstname,
//     lastname: json.lastname,
//     studentcode: studentcode,
//     age: json.age,
//     english: json.english,
//     chinese: json.chinese,
//     science: json.science,
//     maths: json.maths,
//     physics: json.physics,
//   };
//   let stdv = await student.checkStudentValid(studentcode);
//   if (stdv == 0) {
//     let studentdata = student.addNewStudent(d);
//     resp.send(Resp.success(studentdata));
//   } else {
//     resp.send(Resp.error("Student No. Exits"));
//   }
// });

// // Delete student
// app.post("/delStudent", async (req, resp) => {
//   let id = req.body.id;
//   let stdid = student.delStudent(id);
//   resp.send(Resp.success(stdid));
// });

//logout
// app.get("/logout", (req, resp) => {
// req.session.username = null;
//   resp.send(Resp.success(null));
// });

// Port listening
app.listen(3000, () => {
  console.log("Server is running");
});
