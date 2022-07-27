const express = require("express");
const user = require("../router_handler/user");
const router = express.Router();

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

router.get("/CurrentUserInfo", async (req, resp) => {
  const stdd = await user.getCurrentUserInfo(req.auth.id);
  if (stdd.length <= 0) {
    resp.send(Resp.error("User not found"));
  } else {
    resp.send(Resp.success(stdd));
  }
});

module.exports = router;
