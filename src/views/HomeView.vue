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

    <button type="button" @click="logout">Выход</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import "../api";
import { formatCoordinatesToLatLonArray } from "@/api/calculateArea.js";
import { handleMousedown, handleMouseUp } from "@/api/mapInit.js";
import { useApiStore } from "@/store/api.js";
import { useAuthStore } from "@/store/auth.js";

const api = useApiStore();
const router = useRouter();

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

  // eslint-disable-next-line no-undef
  ymaps
      .ready(["ext.paintOnMap"])
      .then(async () => {
        // eslint-disable-next-line no-undef
        map = new ymaps.Map("map", {
          center: [55.75, 37.62],
          zoom: 14,
          controls: [],
        });

        // eslint-disable-next-line no-undef
        map.events.add("mousedown", handleMousedown);
        // eslint-disable-next-line no-undef
        map.events.add("mouseup", handleMouseUp);
        await api.drawFromDB();
      })
      .catch(console.error);
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
    await api.addToDB(title, formatCoordinatesToLatLonArray(window.geoCoordinates));
    resetCoordinates();
    addingName.value = "";
  }
};

const logout = () => {
  const auth = useAuthStore();

  auth.$reset();
  localStorage.clear();
  router.push("/login");
};
</script>

<style scoped></style>