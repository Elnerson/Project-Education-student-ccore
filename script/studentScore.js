"use strict";

const teacher1 = {
  username: "test",
  password: "0000",
  name: "Testing Test",
  mobileNumber: 12121212,
};

const accounts = [teacher1];

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
const labelTotalStudents = document.querySelector(
  ".summary__value--totalStudents"
);
const labelSubject = document.querySelector(".summary__value--totalSubject");

const body = document.getElementById("appBody");
const containerImg = document.querySelector(".boardingimg");
const containerApp = document.querySelector(".app");
const containerStudents = document.querySelector(".students");
const addNewStudentITF = document.querySelector(".addnewstudentITF");
const addNewStudentOverlay = document.querySelector(".overlay");

const btnLogin = document.querySelector(".login__btn");
// const btnTransfer = document.querySelector(".form__btn--transfer");
// const btnLoan = document.querySelector(".form__btn--loan");
// const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const btnAddNewStudent = document.querySelector(".addnewstudents__btn");
const btnCloseAddStudent = document.querySelector(".close__btn");
const btnAddStudents = document.querySelector(".addstudent__btn");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPwd = document.querySelector(".login__input--pwd");
const inputStudentName = document.querySelector(".studentName");
const inputStudentAge = document.querySelector(".studentAge");
const inputEglishScore = document.querySelector(".English-Score");
const inputChineseScore = document.querySelector(".Chinese-Score");
const inputScienceScore = document.querySelector(".Science-Score");
const inputMathsScore = document.querySelector(".Maths-Score");
const inputPhysicsScore = document.querySelector(".Physics-Score");

const displayStudents = function (std) {
  containerStudents.innerHTML = "";

  std.forEach(function (std, i) {
    console.log(std);
    const html = `
              <div class="students__row">
                 <div class="students__type students__type1">${i + 1}</div>
                 <div class="students__name">${std.name}</div>
                 <div class="students__value">${std.score.English}</div>
                 <div class="students__value">${std.score.Chinese}</div>
                 <div class="students__value">${std.score.Science}</div> 
                 <div class="students__value">${std.score.Math}</div>
                 <div class="students__value">${std.score.Physics}</div>
             </div>`;
    containerStudents.insertAdjacentHTML("beforeend", html);
  });
};

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

// const displayChart = function () {
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
// };

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

let logInAccount;
btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  logInAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value.toLowerCase()
  );
  //   console.log(currentAccount);
  if (logInAccount?.password === inputLoginPwd.value) {
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back ${
      logInAccount.name.split(" ")[0]
    }`;
    containerImg.style.display = "none";
    containerApp.style.opacity = 100;
    body.style.overflow = "scroll";

    //clear the input field
    inputLoginUsername.value = inputLoginPwd.value = "";
    inputLoginPwd.blur();
    inputLoginUsername.blur();

    updateUI(students);

    console.log("Login");
  } else {
    alert("Invalid Account!");
  }
});

btnAddStudents.addEventListener("click", function (e) {
  e.preventDefault();
  let name = inputStudentName.value;
  let age = Number(inputStudentAge.value);
  let score = {
    English: Number(inputEglishScore.value),
    Chinese: Number(inputChineseScore.value),
    Science: Number(inputScienceScore.value),
    Math: Number(inputMathsScore.value),
    Physics: Number(inputPhysicsScore.value),
  };
  // for (let i=0;i >= students.length;i++)
  const student4 = { name, age, score };
  console.log(student4);
  students.push(student4);
  alert("Added successfuly");
  hideITF();
  updateUI(students);
});

const handleChange = function (input) {
  if (Number(input.value) > 100) input.value = 100;
  if (Number(input.value) <= 0) input.value = 0;
};

btnAddNewStudent.addEventListener("click", function (e) {
  e.preventDefault();
  addNewStudentITF.classList.remove("hidden");
  addNewStudentOverlay.classList.remove("hidden");
  body.style.overflow = "hidden";
  // body.classList.add("stop-scroll");
});

const hideITF = function () {
  addNewStudentITF.classList.add("hidden");
  addNewStudentOverlay.classList.add("hidden");
  body.style.overflow = "scroll";
  inputStudentName.value =
    inputStudentAge.value =
    inputChineseScore.value =
    inputEglishScore.value =
    inputScienceScore.value =
    inputMathsScore.value =
    inputPhysicsScore.value =
      "";
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
