const express = require("express");
const student = require("../router_handler/student");
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

// Studentinfo
router.get("/getStudentInfo", async (req, resp) => {
  const stdd = await student.getallstudentscore();
  if (stdd.length <= 0) {
    resp.send(Resp.error("student not found"));
  } else {
    resp.send(Resp.success(stdd));
  }
});

//check student Code valid
router.post("/checkStudentValid", async (req, resp) => {
  const stdv = await student.checkStudentValid(req.body.studentcode);
  if (stdv.length > 0) {
    resp.send(Resp.error("Student Exits"));
  } else {
    resp.send(Resp.success("Student No. Valid"));
  }
});

// add new student
router.post("/addstudent", async (req, resp) => {
  let json = req.body;
  let studentcode = `S${json.studentcode}`;
  let d = {
    firstname: json.firstname,
    lastname: json.lastname,
    studentcode: studentcode,
    age: json.age,
    english: json.english,
    chinese: json.chinese,
    science: json.science,
    maths: json.maths,
    physics: json.physics,
  };
  let stdv = await student.checkStudentValid(studentcode);
  if (stdv == 0) {
    let studentdata = student.addNewStudent(d);
    resp.send(Resp.success(studentdata));
  } else {
    resp.send(Resp.error("Student No. Exits"));
  }
});

// Delete student
router.post("/delStudent", async (req, resp) => {
  let id = req.body.id;
  let stdid = student.delStudent(id);
  resp.send(Resp.success(stdid));
});

module.exports = router;
