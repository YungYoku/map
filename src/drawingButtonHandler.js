const button = document.querySelector(".draw__button");

const handleButtonClick = () => {
  window.drawTurnedOn = !window.drawTurnedOn;

  if (window.drawTurnedOn) {
    button.innerHTML = "Рисовать(выключить)";
  } else {
    button.innerHTML = "Рисовать(включить)";
  }
};

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  window.drawTurnedOn = false;
  button.addEventListener("click", handleButtonClick);
} else {
  button.classList.add("hide");
}
