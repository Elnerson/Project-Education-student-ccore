const express = require("express");
const user = require("../router_handler/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config");
const router = express.Router();
//

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

// checking user valid
router.get("/getUserByUsername", async (req, resp) => {
  const usern = await user.getUserByUsername(req.query.username);
  if (usern.length > 0) {
    resp.send(Resp.error("User Exist"));
  } else {
    resp.send(Resp.success(null));
  }
});

// User Login
router.post("/login", async (req, resp) => {
  let json = req.body;
  // console.log(json.username);
  const u = await user.login(json);
  if (u != null) {
    const usr = { ...u, password: "", lastname: "" };
    const token = jwt.sign(usr, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });
    const tokenStr = "Bearer " + token;
    resp.send(Resp.loginSuccess(tokenStr));
  } else {
    resp.send(Resp.error("Username/Password Wrong"));
  }
});

// User Register
router.post("/register", (req, resp) => {
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

module.exports = router;
