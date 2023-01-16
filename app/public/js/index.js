let burgerMenu = document.querySelector(".toggle-nav");
let btnclose = document.querySelector("#btn-close");
let menuContainer = document.querySelector(".main-nav");

burgerMenu.addEventListener("click", () => {
      menuContainer.classList.add("active");
});

btnclose.addEventListener("click", () => {
      menuContainer.classList.remove("active");
});
