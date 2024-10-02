<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username:</label>
        <input
          v-model="username"
          type="text"
          required
        >
      </div>
      <div>
        <label for="email">Email:</label>
        <input
          v-model="email"
          type="email"
          required
        >
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          v-model="password"
          type="password"
          required
        >
      </div>
      <button type="submit">
        Register
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import axiosInstance from '@/router/axios';

const username = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
  try {
    await axiosInstance.post('/api/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value,
    });
    router.push('/login');
  } catch (error) {
    console.error('Failed to register', error);
  }
};
</script>
