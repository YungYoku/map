const popupName = document.querySelector(".popup__name");
const input = popupName.querySelector("#name");
const button = popupName.querySelector(".popup__button");

export const showPopup = () => {
  popupName.classList.remove("hide");
};

const handleButtonClick = () => {
  console.log(input.innerHTML);
  popupName.classList.add("hide");
};

button.addEventListener("click", handleButtonClick);
