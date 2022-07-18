"use strict";

///////////////////////////////////////
// Modal window

const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const login = document.querySelector(".sign-in");
const signup = document.querySelector(".sign-up");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  body.style.overflow = "hidden";
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  login.classList.remove("container--hidden");
  signup.classList.add("container--hidden");
  body.style.overflow = "scroll";
};

document.getElementById("linkCreateAccount").addEventListener("click", (e) => {
  e.preventDefault();
  login.classList.add("container--hidden");
  signup.classList.remove("container--hidden");
});

document.getElementById("linkLogin").addEventListener("click", (e) => {
  e.preventDefault();
  login.classList.remove("container--hidden");
  signup.classList.add("container--hidden");
});

let logInAccount;
document
  .querySelector(".btn--login")
  .addEventListener("click", function (event) {
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

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  console.log(
    "height/Width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  });
});

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (
    e.target.classList.contains("nav__link") &&
    !e.target.classList.contains("btn--show-modal")
  ) {
    const id = e.target.getAttribute("href");
    // if (e.target.classList contains("btn--show-modal"))
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

const h1 = document.querySelector("h1");
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// console.log(h1.childNodes);
// console.log(h1.children);
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "Red";

// h1.addEventListener("mouseenter", function (e) {
//   alert("You reading te heading");
// });

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

const handleHover = function (e, op) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = op;
      }
    });
    logo.style.opacity = op;
  }
};

nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

// document.getElementById("btnGet").addEventListener("click", function () {
//   $.get(
//     "http://www.liulongbin.top:3006/api/getbooks",
//     { id: 1 },
//     function (res) {
//       console.log(res);
//     }
//   );
// });

// document.getElementById("btnPost").addEventListener("click", function () {
//   $.post(
//     "http://www.liulongbin.top:3006/api/addbook",
//     { bookname: "水浒传", author: "施耐庵", publisher: "天津图书出版社" },
//     function (res) {
//       console.log(res);
//     }
//   );
// });

// document.getElementById("btnAjaxGet").addEventListener("click", function () {
//   $.ajax({
//     type: "get",
//     url: "http://www.liulongbin.top:3006/api/getbooks",

//     success: function (res) {
//       console.log(res);
//     },
//   });
// });

// document.getElementById("btnAjaxPost").addEventListener("click", function () {
//   $.ajax({
//     type: "post",
//     url: "http://www.liulongbin.top:3006/api/addbook",
//     data: { bookname: "鹿鼎记", author: "", publisher: "天津图书出版社" },
//     success: function (res) {
//       console.log(res);
//     },
//   });
// });
