"use strict";

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

function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".modal__message");

  messageElement.textContent = message;
  messageElement.classList.remove(
    "modal__message--success",
    "modal__message--error"
  );
  messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
  inputElement.classList.add("modal__input--error");
  inputElement.parentElement.querySelector(
    ".modal__input-error-message"
  ).textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("modal__input--error");
  inputElement.parentElement.querySelector(
    ".modal__input-error-message"
  ).textContent = "";
}

// document.addEventListener("DOMContentLoaded", () => {
//   const loginForm = document.getElementById("login");

//   loginForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     // Perform your AJAX/Fetch login

//     setFormMessage(loginForm, "error", "Invalid username/password combination");
//   });

//   document.querySelectorAll(".modal__input").forEach((inputElement) => {
//     inputElement.addEventListener("blur", (e) => {
//       if (
//         e.target.id === "signupUsername" &&
//         e.target.value.length > 0 &&
//         e.target.value.length < 10
//       ) {
//         setInputError(
//           inputElement,
//           "Username must be at least 10 characters in length"
//         );
//       }
//     });

//     inputElement.addEventListener("input", (e) => {
//       clearInputError(inputElement);
//     });
//   });
// });

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
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

const h1 = document.querySelector("h1");
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "Red";

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

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

layui.use(["form"], function () {
  var form = layui.form,
    layer = layui.layer;

  //Field validation
  form.verify({
    username: function (value) {
      if (value.length < 3) {
        return "Username too short";
      }
    },
    password: function (value) {
      if (!/^[\S]{6,12}$/.test(value)) {
        return "Password must be 6~12 character and space is not allowed";
      }
    },
    password2: function (value) {
      if (value != form.val("registerform").password) {
        return "Password not same";
      }
    },
  });

  //Login button listening
  form.on("submit(userLogin)", function (info) {
    // $(this).html("<i class=layui-icon layui-icon-loading></i>");
    // $(this).addClass("layui-btn-disabled");
    const data = JSON.stringify(info.field);
    request({ url: "/api/login", type: "post", data }).then((res) => {
      layer.msg("Login Success");
      localStorage.setItem("token", res.token);
      setTimeout(function () {
        location.href = `/studentScore`;
      }, 800);
    });
    return false;
  });

  //Signup button listening
  form.on("submit(userRegister)", function (info) {
    $(this).html("<i class=layui-icon layui-icon-loading-1></i>");
    $(this).addClass("layui-btn-disabled");
    const data = JSON.stringify(info.field);
    request({ url: "/api/register", type: "post", data }).then((res) => {
      layer.msg("Register Success");
      $(this).removeClass("layui-btn-disabled");
      console.log("====>", res);
      setTimeout(function () {
        location.href = "/studentScore";
      }, 800);
    });
    return false;
  });
});
