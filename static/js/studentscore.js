"use strict";

const updateUI = function () {
  getStudent();
  studentChart();
};

//Get Student Info
const containerStudents = document.querySelector(".students");
const studentsdiv = document.getElementById("students");
function getStudent() {
  $.ajax({
    url: "/apiAuth/getStudentInfo",
    type: "get",
    contentType: "application/json",
    headers: { Authorization: localStorage.getItem("token") || "" },
    success: (res) => {
      if (res.code !== 200) return alert("Unable to receive student data");
      containerStudents.innerHTML = "";
      $.each(res.data, function (i, std) {
        const html =
          `
      <div class="students__row">
         <div class="students__type students__type1">${i + 1}</div>
         <div class="students__name">${std.firstname}</br> ${std.lastname}</div>
         <div class="students__value">${std.english}</div>
         <div class="students__value">${std.chinese}</div>
         <div class="students__value">${std.science}</div> 
         <div class="students__value">${std.maths}</div>
         <div class="students__value">${std.physics}</div>
         <div class="students_del"><a href="javascript:;" class="del" data-id="` +
          std.id +
          `"><i class="layui-icon layui-icon-delete"></i> </a></div>
     </div>`;
        containerStudents.insertAdjacentHTML("beforeend", html);
      });
      document.querySelector(
        ".summary__value--totalStudents"
      ).textContent = `${res.data.length}`;
    },
  });
}
getStudent();

// Delete student
$(function () {
  $(studentsdiv).on("click", ".del", function () {
    const id = $(this).attr("data-id");
    const data = `{"id": "${id}"}`;
    layer.confirm(
      "Confirm Delete?",
      { btn: ["Yes", "No"], icon: 3, title: "Alert", shadeClose: true },
      function (index) {
        // const data = JSON.parse(myJSON);
        request({
          url: "/apiAuth/delStudent",
          type: "post",
          data,
          headers: { Authorization: localStorage.getItem("token") },
        }).then((res) => {
          console.log("====>", res);
          layer.msg(`Student Deleted`);
          updateUI();
        });
        layer.close(index);
      }
    );
    return false;
  });
});

//User data
const labelWelcome = document.querySelector(".welcome");
function getCurentUserInfo() {
  $.ajax({
    url: "/apiAuth/currentUserInfo",
    type: "get",
    contentType: "application/json",
    headers: { Authorization: localStorage.getItem("token") || "" },
    success: (res) => {
      if (res.code !== 200) return alert("Unable to receive User data");
      renderAvatar(res.data[0]);
    },
  });
}
getCurentUserInfo();

function renderAvatar(user) {
  const firstname = user.firstname;
  const lastname = user.lastname;

  labelWelcome.textContent = `Welcome back ${firstname}`;
  document.querySelector(".username").textContent = `${firstname} ${lastname}`;
  if (user.avatar_pic !== null) {
    $(".userimg").attr("src", user.avatar_pic).show();
    $(".userimg_large").attr("src", user.avatar_pic).show();
    $(".text-avatar").hide();
  } else {
    const first = firstname[0].toUpperCase();
    $("userimg").hide();
    $(".text-avatar").html(first).show();
  }
}

//Student Chart
const studentChart = function () {
  const studentName = [];
  const subjectData = [];
  $.ajax({
    type: "get",
    url: "/apiAuth/getStudentInfo",
    headers: { Authorization: localStorage.getItem("token") || "" },
    success: function (res) {
      const englsihSubjectScore = [];
      const chineseSubjectScore = [];
      const scienceSubjectScore = [];
      const mathsSubjectScore = [];
      const physicsSubjectScore = [];
      if (res.code !== 200) return alert("Unable Receive Data");
      $.map(res.data, (std, i, arr) => {
        const name = std.firstname;
        studentName.push(name);
      });
      $.map(res.data, (std, i, arr) => {
        englsihSubjectScore.push(std.english);
        chineseSubjectScore.push(std.chinese);
        scienceSubjectScore.push(std.science);
        mathsSubjectScore.push(std.maths);
        physicsSubjectScore.push(std.physics);
      });
      const english = { name: "English", data: englsihSubjectScore };
      const chinese = { name: "Chinese", data: chineseSubjectScore };
      const science = { name: "Science", data: scienceSubjectScore };
      const maths = { name: "Maths", data: mathsSubjectScore };
      const physics = { name: "Physics", data: physicsSubjectScore };
      subjectData.push(english, chinese, science, maths, physics);

      Highcharts.chart("chart_childcontainer", {
        chart: {
          type: "column",
        },
        title: {
          text: "Subject & Score",
        },
        xAxis: {
          categories: studentName,
        },
        yAxis: {
          title: {
            text: "Score",
          },
        },
        series: subjectData,
      });
      document.querySelector(".summary__value--totalSubject").textContent =
        subjectData.length;
    },
  });
};
studentChart();

//Logout
const logout = document.querySelector(".logout");
logout.addEventListener("click", function () {
  layer.confirm(
    "Confirm Logout?",
    { btn: ["Yes", "No"], icon: 3, title: "Alert", shadeClose: true },
    function (index) {
      localStorage.removeItem("token");
      layer.msg(`Logout Successful`);
      setTimeout(function () {
        location.href = "/";
      }, 500);

      layer.close(index);
    }
  );
});

// Elements
const labelDate = document.querySelector(".date");
// const labelSubject = document.querySelector(".summary__value--totalSubject");
const body = document.getElementById("appBody");
const containerApp = document.querySelector(".app");

//Show Add New Student interface
const addNewStudentITF = document.querySelector(".addnewstudentITF");
const Overlay = document.querySelector(".overlay");
const btnAddStudents = document.querySelector(".addstudent__btn");
const showAddNewStudentITF = function () {
  addNewStudentITF.classList.remove("hidden");
  Overlay.classList.remove("hidden");
  body.style.overflow = "hidden";
};

//Student Score input limiter
function limiter(input) {
  if (input.value < 0) input.value = 0;
  if (input.value > 100) input.value = 100;
}

//Close Add New Student interface
const hideAddNewStudentITF = function () {
  const input = document.querySelectorAll(".layui-input");
  addNewStudentITF.classList.add("hidden");
  Overlay.classList.add("hidden");
  body.style.overflow = "scroll";
  [].forEach.call(input, (i) => {
    i.value = "";
  });
};

//Open Change Password interface
const changePwITF = document.querySelector(".changePasswordITF");
const showPasswordITF = function () {
  changePwITF.classList.remove("hidden");
  Overlay.classList.remove("hidden");
  body.style.overflow = "hidden";
};

//Close Change Password interface
const hideChangePwITF = function () {
  const input = document.querySelectorAll(".layui-input");
  changePwITF.classList.add("hidden");
  Overlay.classList.add("hidden");
  body.style.overflow = "scroll";
  [].forEach.call(input, (i) => {
    i.value = "";
  });
};

//Open Change Profile Image interface
const changeAvatarITF = document.querySelector(".changeAvatarITF");
const showChangeAvatarITF = function () {
  changeAvatarITF.classList.remove("hidden");
  // changeAvatarITF.style.visibility = "visible";
  Overlay.classList.remove("hidden");
  body.style.overflow = "hidden";
};

//Close Change Profile Image interface
const hideChangeAvatarITF = function () {
  const changeAvatarContainer = document.getElementById(
    "changeAvatarContainer"
  );
  const profileImage = document.querySelector(".profileImg");
  const btnRow = document.querySelector(".row2");
  changeAvatarITF.classList.add("hidden");
  Overlay.classList.add("hidden");
  body.style.overflow = "scroll";
  changeAvatarContainer.classList.add("hidden");
  btnRow.classList.add("hidden");
  profileImage.classList.remove("hidden");
};

//Overlay controller
const overlayClick = function () {
  hideAddNewStudentITF();
  hideChangePwITF();
  hideChangeAvatarITF();
};

document.addEventListener("keydown", function (press) {
  if (
    press.key === "Escape" &&
    !addNewStudentITF.classList.contains("hidden")
  ) {
    hideAddNewStudentITF();
    body.style.overflow = "scroll";
  }
  if (press.key === "Escape" && !changePwITF.classList.contains("hidden")) {
    hideChangePwITF();
    body.style.overflow = "scroll";
  }
  if (press.key === "Escape" && !changeAvatarITF.classList.contains("hidden")) {
    hideChangeAvatarITF();
    body.style.overflow = "scroll";
  }
});

//Add Student form listen
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

    newPassword: function (value) {
      if (!/^[\S]{6,12}$/.test(value)) {
        return "New password must be 6~12 character and space is not allowed";
      }
    },
    newPassword2: function (value) {
      if (value != form.val("changePWform").newPassword) {
        return "Confirm password did not match";
      }
    },
  });

  //Add Student button listening
  form.on("submit(addStudent)", function (info) {
    layer.confirm(
      "Confirm Add?",
      { btn: ["Yes", "No"], icon: 3, title: "Alert", shadeClose: true },
      function (index) {
        const data = JSON.stringify(info.field);
        request({
          url: "/apiAuth/addstudent",
          type: "post",
          data,
          headers: { Authorization: localStorage.getItem("token") },
        }).then((res) => {
          if ((res.code = 200)) {
            layer.msg("Student Added");
            hideITF();
            updateUI();
          }
        });
        layer.close(index);
      }
    );
    return false;
  });

  form.on("submit(changePassword)", function (info) {
    layer.confirm(
      "Confirm Change?",
      { btn: ["Yes", "No"], icon: 3, title: "Alert", shadeClose: true },
      function (index) {
        const data = JSON.stringify(info.field);
        request({
          url: "/apiAuth/updatePassword",
          type: "post",
          data,
          headers: { Authorization: localStorage.getItem("token") },
        }).then((res) => {
          if ((res.code = 200)) {
            layer.msg("Password Changed successfully.</br> Please login again");
            localStorage.removeItem("token");
            setTimeout(function () {
              location.href = "/";
            }, 800);
          }
          layer.close(index);
        });
      }
    );
    return false;
  });
});
