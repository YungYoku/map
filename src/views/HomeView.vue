<template>
  <div class="popup popup__tip">
    <div class="wrap">
      <p class="popup__text">{{ tipText }}</p>

      <button class="popup__button" type="button" @click="closeTip">
        Закрыть
      </button>
    </div>
  </div>

  <div class="popup popup__name hide">
    <div class="wrap">
      <div class="name">
        <label for="name">Название:</label>
        <input id="name" v-model.trim="addingName" type="text"/>
      </div>

      <button class="popup__button" type="button" @click="add">
        Добавить
      </button>
    </div>
  </div>

  <div id="map"></div>

  <div class="info">
    <div class="result">
      Площадь = 0(км²) | 0(м²).
    </div>

    <button class="draw__button" type="button">
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import "@/api/mapInit.js";
import "@/api/paintOnMap.js";
import "@/api/calculateArea.js";
import "@/api/api.js";
import { addToDB } from "@/api/api.js";
import { formatCoordinatesToLatLonArray } from "@/api/calculateArea.js";

const tipText = ref("");
const buttonText = ref("");

const closeTip = () => {
  document.querySelector(".popup__tip").classList.add("hide");
};


let button = document.querySelector(".draw__button");

const handleButtonClick = () => {
  window.drawTurnedOn = !window.drawTurnedOn;

  if (window.drawTurnedOn) {
    buttonText.value = "Рисовать(выключить)";
  } else {
    buttonText.value = "Рисовать(включить)";
  }
};

onMounted(() => {
  if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
          navigator.userAgent
      )
  ) {
    tipText.value = "Чтобы включить режим рисования, нажмите кнопку 'Рисовать', а затем рисуйте.";
    window.drawTurnedOn = false;
    button.addEventListener("click", handleButtonClick);
  } else {
    tipText.value = "Чтобы включить режим рисования, зажмите клавишу ctrl и левую кнопку мыши, а затем ведите мышкой.";
    document.querySelector(".draw__button").classList.add("hide");
  }
});


const resetCoordinates = () => {
  window.geoCoordinates = [];
};

const hideAddObjectPopup = () => {
  document.querySelector(".popup__name").classList.add("hide");
};
const addingName = ref("");
const add = async () => {
  const title = addingName.value;
  if (title) {
    hideAddObjectPopup();
    await addToDB(title, formatCoordinatesToLatLonArray(window.geoCoordinates));
    resetCoordinates();
    addingName.value = "";
  }
};
</script>

<style scoped></style>