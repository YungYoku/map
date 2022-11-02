import { addToDB } from "./api.js";
import { formatCoordinatesToLatLonArray } from "./calculateArea.js";

const popupName = document.querySelector(".popup__name");
const input = popupName.querySelector("#name");
const button = popupName.querySelector(".popup__button");

const resetCoordinates = () => {
  window.geoCoordinates = [];
};

export const showAddObjectPopup = () => {
  popupName.classList.remove("hide");
};

const hideAddObjectPopup = () => {
  popupName.classList.add("hide");
};

const handleButtonClick = async () => {
  const title = input.value;
  if (title) {
    hideAddObjectPopup();
    await addToDB(title, formatCoordinatesToLatLonArray(window.geoCoordinates));
    resetCoordinates();
    input.value = "";
  }
};

button.addEventListener("click", handleButtonClick);
