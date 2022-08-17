const express = require("express");
// const { update } = require("../router_handler/user");
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

router.get("/currentUserInfo", async (req, resp) => {
  const stdd = await user.getCurrentUserInfo(req.auth.id);
  if (stdd.length < 1) {
    resp.send(Resp.error("User not found"));
  } else {
    resp.send(Resp.success(stdd));
  }
});

router.post("/updatePassword", async (req, resp) => {
  const userinfo = req.body;
  userinfo.id = req.auth.id;
  userinfo.username = req.auth.username;
  const u = await user.updatepassword(userinfo);
  if (u != null && u !== "same password") {
    resp.send(Resp.success());
  } else if (u == "same password") {
    resp.send(Resp.error("New password & Existing Password cannot be same"));
  } else if (u == null) {
    resp.send(Resp.error("Current Password Wrong"));
  }
});

router.post("/updateAvatarImg", async (req, resp) => {
  const userinfo = req.body;
  userinfo.id = req.auth.id;
  const u = await user.updateavatarimg(userinfo);
  if (u.affectedRows !== 1) {
    resp.send(Resp.error("Updated fail"));
  } else {
    resp.send(Resp.success());
  }
});

module.exports = router;
