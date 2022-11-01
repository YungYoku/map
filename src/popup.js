const popup = document.querySelector(".popup");
const text = document.querySelector(".popup__text");
const button = document.querySelector(".popup__button");

button.addEventListener("click", () => {
  popup.classList.add("hide");
});

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  text.innerHTML =
    "Чтобы включить режим рисования, нажмите кнопку 'Рисовать', а затем рисуйте.";
} else {
  text.innerHTML =
    "Чтобы включить режим рисования, зажмите клавишу alt и левую кнопку мыши, а затем ведите мышкой.";
}
