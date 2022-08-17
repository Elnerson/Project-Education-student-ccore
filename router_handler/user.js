const { db } = require("../db");
const crypto = require("crypto");

const user = {
  getUserByUsername: async (username) => {
    const sql =
      "select id,username,password,firstname,lastname from education.user where username = ? and status = 0";
    return await db(sql, [username]);
  },

  login: async (json) => {
    const users = await user.getUserByUsername(json.username);
    if (users.length > 0) {
      const u = users[0];
      let enpwd = crypto
        .createHash("md5")
        .update(json.password + json.username)
        .digest("hex");
      // console.log(enpwd);
      if (u.password === enpwd) {
        return u;
      }
    }
    return null;
  },

  getPassword: async (id) => {
    const sql = "select password from education.user where id=?";
    return await db(sql, id);
  },

  updatepassword: async (json) => {
    let currentPasswordData = await user.getPassword(json.id);
    let currentPasswordObject = currentPasswordData[0];
    const currentPassword = currentPasswordObject.password;
    const keyInPassword = crypto
      .createHash("md5")
      .update(json.keyInPassword + json.username)
      .digest("hex");
    const newPassword = crypto
      .createHash("md5")
      .update(json.newPassword + json.username)
      .digest("hex");
    if (keyInPassword == currentPassword && newPassword != currentPassword) {
      let userdata = [newPassword, json.id];
      const sql = "update education.user set password=? where id =?";
      return await db(sql, userdata);
    } else if (
      keyInPassword == currentPassword &&
      newPassword == currentPassword
    ) {
      return "same password";
    } else {
      return null;
    }
  },

  updateavatarimg: async (json) => {
    let userdata = [json.avatar_pic, json.id];
    const sql = "update education.user set avatar_pic=? where id =?";
    return await db(sql, userdata);
  },

  add: async (user) => {
    const sql = "insert into user set ?";
    return await db(sql, user);
  },

  update: async (arr) => {
    // [user,id]==> [{firstname:"",lastname:""},id]
    const sql = "update education.user set ? where id=?";
    return await db(sql, arr);
  },

  //receive all user
  getusers: async () => {
    const sql =
      "select id,username,password,firstname,lastname from education.user where status = 0";
    return await db(sql);
  },

  getCurrentUserInfo: async (id) => {
    const sql =
      "select id,username,firstname,lastname,email,avatar_pic from education.user where id=?";
    return await db(sql, id);
  },
};

module.exports = user;
