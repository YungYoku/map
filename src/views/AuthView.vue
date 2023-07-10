<template>
  <form @submit.prevent="login">
    <input v-model.trim="email" type="text"/>

    <input v-model.trim="password" type="text"/>

    <button>Войти</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const router = useRouter();

const email = ref("");
const password = ref("");

const handleResponse = async (response) => {
  localStorage.uid = response.user.uid;
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
form {
  width: 300px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  margin: auto;
}
</style>