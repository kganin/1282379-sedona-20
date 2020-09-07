var navMain = document.querySelector(".header__nav-list");
var navToggle = document.querySelector(".header__toggle");

navMain.classList.remove("header__nav-list--no-js");

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("header__nav-list--closed")) {
    navMain.classList.remove("header__nav-list--closed");
    navMain.classList.add("header__nav-list--opened");
  } else {
    navMain.classList.remove("header__nav-list--opened");
    navMain.classList.add("header__nav-list--closed");
  }
});
