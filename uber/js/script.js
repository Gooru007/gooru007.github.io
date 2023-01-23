let burger = document.querySelector(".burger");
let menu = document.querySelector(".menu");
let menuLeft = document.querySelector(".menu-left");
let menuItem = document.querySelectorAll(".menu__item");

burger.addEventListener("click", function () {
  burger.classList.toggle("burger-active");
  menu.classList.toggle("menu-active");
  menuLeft.classList.toggle("menu-left-active");
  document.body.classList.toggle("no-scroll");
});

menuItem.forEach(function (item) {
  item.addEventListener("click", function () {
    burger.classList.remove("burger-active");
    menu.classList.remove("menu-active");
    menuLeft.classList.remove("menu-left-active");
    document.body.classList.remove("no-scroll");
  });
});
