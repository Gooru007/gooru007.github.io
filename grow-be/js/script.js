const swiper = new Swiper(".clientssay__slider", {
  slidesPerView: 3.5,
  spaceBetween: 30,
  loop: true,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 1.3,
    },
    800: {
      slidesPerView: 1.7,
    },
    1000: {
      slidesPerView: 2.2,
    },
    1400: {
      slidesPerView: 2.8,
    },
    1800: {
      slidesPerView: 3.3,
    },
    2200: {
      slidesPerView: 3.5,
    },
    2500: {
      slidesPerView: 4,
    },
    3000: {
      slidesPerView: 4.5,
    },
  },
});
const swiperNews = new Swiper(".news__slider", {
  spaceBetween: 30,
  loop: true,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    800: {
      slidesPerView: 1.2,
    },
    1000: {
      slidesPerView: 1.3,
    },
    1400: {
      slidesPerView: 1.8,
    },
    1800: {
      slidesPerView: 2.3,
    },
    2200: {
      slidesPerView: 2.8,
    },
    2500: {
      slidesPerView: 3,
    },
    3000: {
      slidesPerView: 3.5,
    },
  },
});

window.addEventListener("scroll", function () {
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let windowScroll = document.documentElement.scrollTop;
  let scrolled = (windowScroll / height) * 100;

  document.querySelector(".progress-bar").style.height = scrolled + "%";
  console.log(scrolled + "%");
});

window.addEventListener("scroll", function () {
  let pageUp = document.querySelector(".pageup");
  if (document.documentElement.scrollTop > 1000) {
    pageUp.classList.add("active");
  } else {
    pageUp.classList.remove("active");
  }
});

let burger = document.querySelector(".burger");
let menu = document.querySelector(".menu");
let menuLeft = document.querySelector(".menu-left");
let menuItems = document.querySelectorAll(".menu__item--js");

burger.addEventListener("click", function () {
  burger.classList.toggle("burger-active");
  menu.classList.toggle("menu-active");
  menuLeft.classList.toggle("menu-left-active");
  document.body.classList.toggle("no-scroll");
});

menuItems.forEach(function (item) {
  item.addEventListener("click", function () {
    burger.classList.remove("burger-active");
    menu.classList.remove("menu-active");
    menuLeft.classList.remove("menu-left-active");
    document.body.classList.remove("no-scroll");
  });
});

let submenu = document.querySelector(".submenu--js");
let openSubmenu = document.querySelector(".has-submenu--js");

openSubmenu.addEventListener("click", function () {
  if (submenu.style.height) {
    submenu.style.height = null;
  } else {
    submenu.style.height = submenu.scrollHeight + "px";
  }
  openSubmenu.classList.toggle("active");
});
