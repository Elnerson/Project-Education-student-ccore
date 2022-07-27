"use strict";

const containerStudents = document.querySelector(".students");
const studentsdiv = document.getElementById("students");
const logoutdiv = document.getElementById("logout");

// receive student info
$(function () {
  const token = localStorage.getItem("token");
  $.ajaxSetup({ header: { Authorization: token } });
  function getStudent() {
    $.get("/apiAuth/getStudentInfo", (res) => {
      if (res.code !== 200) return alert("Invalid student data");
      containerStudents.innerHTML = "";
      $.each(res.data, function (i, std) {
        const html =
          `
        <div class="students__row">
           <div class="students__type students__type1">${i + 1}</div>
           <div class="students__name">${std.firstname}</br> ${
            std.lastname
          }</div>
           <div class="students__value">${std.english}</div>
           <div class="students__value">${std.chinese}</div>
           <div class="students__value">${std.science}</div> 
           <div class="students__value">${std.maths}</div>
           <div class="students__value">${std.physics}</div>
           <div class="students_del"><a href="javascript:;" class="del" data-id="` +
          std.id +
          `">Del</a></div>
       </div>`;
        containerStudents.insertAdjacentHTML("beforeend", html);
      });
      document.querySelector(
        ".summary__value--totalStudents"
      ).textContent = `${res.data.length}`;
    });
  }

  getStudent();
  $(studentsdiv).on("click", ".del", function () {
    const id = $(this).attr("data-id");
    const data = `{"id": "${id}"}`;
    // const data = JSON.parse(myJSON);
    request({ url: "/apiAuth/delStudent", type: "post", data }).then((res) => {
      console.log("====>", res);
      alert(`Student Deleted`);
      getStudent();
    });
    return false;
  });

  $(logoutdiv).on("click", ".logout", function () {
    console.log("click");
    $.get("/api/logout", (res) => {
      console.log("====>", res);
      layer.msg(`Logout Successful`);
      setTimeout(function () {
        location.href = "/";
      }, 500);
    });
    return false;
  });

  const studentName = [];
  function chartData() {
    $.get("/apiAuth/getStudentInfo", function (res) {
      if (res.code !== 200) return alert("Unable Receive Data");
      $.map(res.data, function (std, i, arr) {
        const name = std.firstname + " " + std.lastname;
        studentName.push(name);
      });
      console.log(studentName);
    });
  }
  chartData();
});

const student1 = {
  name: "Lucas",
  age: 7,
  score: {
    English: 98,
    Chinese: 88,
    Science: 78,
    Math: 100,
    Physics: 51,
  },
};

const student2 = {
  name: "June",
  age: 7,
  score: {
    English: 90,
    Chinese: 68,
    Science: 100,
    Math: 78,
    Physics: 89,
  },
};

const student3 = {
  name: "Xiao Ming",
  age: 7,
  score: {
    English: 100,
    Chinese: 99,
    Science: 78,
    Math: 88,
    Physics: 68,
  },
};

const subjects = {
  1: "English",
  2: "Chinese",
  3: "Science",
  4: "Maths",
  5: "Phaysics",
};

// Chart Data
const students = [student1, student2, student3];

let studentData = [];
students.map((std, i, arr) => {
  const name = std.name;
  const data = Object.values(std.score);
  const studentdatas = { name, data };
  // console.log(Object.keys(studentdatas));
  studentData.push(studentdatas);
});

const subjectsarr = Object.values(subjects);

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelSubject = document.querySelector(".summary__value--totalSubject");

const body = document.getElementById("appBody");
const containerApp = document.querySelector(".app");

const addNewStudentITF = document.querySelector(".addnewstudentITF");
const addNewStudentOverlay = document.querySelector(".overlay");

const btnLogin = document.querySelector(".login__btn");

const btnSort = document.querySelector(".btn--sort");
const btnAddNewStudent = document.querySelector(".addnewstudents__btn");
const btnCloseAddStudent = document.querySelector(".close__btn");
const btnAddStudents = document.querySelector(".addstudent__btn");

const calcDisplaySummary = function (stds) {
  const totalstudents = stds.reduce((acc, _, i, arr) => acc + i, 0);
  console.log(totalstudents);
  labelTotalStudents.textContent = `${totalstudents}`;
  // stds.forEach((std, i, arr) => {
  //   const value = Object.values(std.score);
  //   const sum = value.reduce((acc, value) => acc + value, 0);
  // });
};

const displayTotalSubject = function () {
  let totalSubject = subjectsarr.length;
  labelSubject.textContent = totalSubject;
};

document.addEventListener("DOMContentLoaded", function () {
  Highcharts.chart("chart_childcontainer", {
    chart: {
      type: "column",
    },
    title: {
      text: "Subject & Score",
    },
    xAxis: {
      categories: subjectsarr,
    },
    yAxis: {
      title: {
        text: "Score",
      },
    },
    series: studentData,
  });
});

const updateUI = function (std) {
  //Display students
  displayStudents(std);
  //Display summary
  calcDisplaySummary(std);
  //Display Total Subject
  displayTotalSubject();
  //Display Chart
  displayChart();
};

// btnAddStudents.addEventListener("click", function (e) {
//   e.preventDefault();
//   let name = inputStudentName.value;
//   let age = Number(inputStudentAge.value);
//   let score = {
//     English: Number(inputEglishScore.value),
//     Chinese: Number(inputChineseScore.value),
//     Science: Number(inputScienceScore.value),
//     Math: Number(inputMathsScore.value),
//     Physics: Number(inputPhysicsScore.value),
//   };

//   const student4 = { name, age, score };
//   console.log(student4);
//   students.push(student4);
//   alert("Added successfuly");
//   hideITF();
//   updateUI(students);
// });

const handleChange = function (input) {
  if (Number(input.value) > 100) input.value = 100;
  if (Number(input.value) <= 0) input.value = 0;
};

btnAddNewStudent.addEventListener("click", function (e) {
  e.preventDefault();
  addNewStudentITF.classList.remove("hidden");
  addNewStudentOverlay.classList.remove("hidden");
  body.style.overflow = "hidden";
});

const hideITF = function () {
  addNewStudentITF.classList.add("hidden");
  addNewStudentOverlay.classList.add("hidden");
  body.style.overflow = "scroll";
  // inputStudentName.value =
  //   inputStudentAge.value =
  //   inputChineseScore.value =
  //   inputEglishScore.value =
  //   inputScienceScore.value =
  //   inputMathsScore.value =
  //   inputPhysicsScore.value =
  //     "";
};

document.addEventListener("keydown", function (press) {
  if (
    press.key === "Escape" &&
    !addNewStudentITF.classList.contains("hidden")
  ) {
    hideITF();
    body.style.overflow = "scroll";
  }
});

btnCloseAddStudent.addEventListener("click", hideITF);
addNewStudentOverlay.addEventListener("click", hideITF);

layui.use(["form"], function () {
  var form = layui.form,
    layer = layui.layer;

  //Field validation
  form.verify({
    Name: function (value) {
      if (value.length < 3) {
        return "Username too short";
      }
    },
  });

  //Add Student button listening
  form.on("submit(addStudent)", function (info) {
    const data = JSON.stringify(info.field);
    request({ url: "/apiAuth/addstudent", type: "post", data }).then((res) => {
      if ((res.code = 200)) {
        // console.log("====>", res);
        layer.msg("Student Added");
      }
    });
    return false;
  });
});
