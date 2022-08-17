const express = require("express");
const util = require("./util");
const app = express();
var { expressjwt: jwt } = require("express-jwt");
const config = require("./config");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(__dirname + "/static"));

app.use(
  "/apiAuth",
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

// Port listening
app.listen(3000, () => {
  console.log("Server is running");
});
