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
    // console.log(users.length);
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

  add: async (user) => {
    // {username:"",password:"",email:"",firstname:"",lastname:""}
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
      "select id,username,firstname,lastname,email from education.user where id=?";
    return await db(sql, id);
  },
};

module.exports = user;
