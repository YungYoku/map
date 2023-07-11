<template>
  <div class="wrap">
    <form @submit.prevent="login">
      <h1>Вход</h1>

      <input v-model.trim="email" type="text"/>

      <input v-model.trim="password" type="text"/>

      <button>Войти</button>
    </form>

    <router-link to="/reg">Зарегистрироваться</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthStore } from "@/store/auth.js";

const auth = useAuthStore();

const router = useRouter();

const email = ref("");
const password = ref("");

const handleResponse = async (response) => {
  auth.setUid(response.user.uid);
  await router.push("/");
};

const handleError = (error) => {
  console.error(error);
};

const login = async () => {
  await signInWithEmailAndPassword(getAuth(), email.value, password.value)
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