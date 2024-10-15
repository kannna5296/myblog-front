<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
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
        Login
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { AuthRepository } from '@/repositories/generated/services/AuthRepository';

const email = ref('admin@example.com');
const password = ref('pass123');
const router = useRouter();

const login = async () => {
  try {
    const loginResponse = await AuthRepository.login({
      requestBody: {
        email: email.value,
        password: password.value,
      },
    });
    localStorage.setItem('token', loginResponse.jwt);
    router.push('/post');
  } catch (error) {
    console.error('Failed to login', error);
  }
};
</script>
