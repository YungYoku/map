<template>
  <div class="wrap">
    <form @submit.prevent="register">
      <h1>Регистрация</h1>

      <input v-model.trim="email" type="text"/>

      <input v-model.trim="password" type="text"/>

      <button>Зарегистрироваться</button>
    </form>

    <router-link to="/login">Войти</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useAuthStore } from "@/store/auth.js";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/main.js";

const auth = useAuthStore();

const router = useRouter();

const email = ref("");
const password = ref("");

const addEmptyTableInDb = async (uid) => {
  await setDoc(doc(db, "areas", uid), {
    ids: [],
  });
};

const handleResponse = async (response) => {
  auth.setUid(response.user.uid);
  await addEmptyTableInDb(response.user.uid);
  await router.push("/");
};

const handleError = (error) => {
  console.error(error);
};

const register = async () => {
  await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then(handleResponse)
      .catch(handleError);
};
</script>

<style scoped>
.wrap {
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
}

form {
  width: 300px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}
</style>