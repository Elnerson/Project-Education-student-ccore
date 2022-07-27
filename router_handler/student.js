const { db } = require("../db");

const student = {
  getallstudentscore: async () => {
    const sql =
      "select id,studentcode,firstname,lastname,english,chinese,science,maths,physics from education.student where status = 0";
    return await db(sql);
  },

  checkStudentValid: async (studentcode) => {
    const sql =
      "select id,firstname,lastname from education.student where studentcode = ?";
    return await db(sql, studentcode);
  },

  addNewStudent: async (studentdata) => {
    // {username:"",password:"",email:"",firstname:"",lastname:""}
    const sql = "insert into education.student set ?";
    return await db(sql, studentdata);
  },

  updateStudent: async (arr) => {
    // [user,id]==> [{firstname:"",lastname:""},id]
    const sql = "update education.student set ? where id=?";
    return await db(sql, arr);
  },

  delStudent: async (id) => {
    //status :1
    const sql = "update education.student set status = 1 where id=?";
    return await db(sql, id);
  },
};

module.exports = student;
