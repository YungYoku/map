const popup = document.querySelector(".popup");
const button = document.querySelector(".popup__button");

button.addEventListener("click", () => {
  popup.classList.add("hide");
});
