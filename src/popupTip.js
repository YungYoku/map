const popupTip = document.querySelector(".popup__tip");
const text = popupTip.querySelector(".popup__text");
const button = popupTip.querySelector(".popup__button");

button.addEventListener("click", () => {
  popupTip.classList.add("hide");
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
    "Чтобы включить режим рисования, зажмите клавишу ctrl и левую кнопку мыши, а затем ведите мышкой.";
}
