<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import axiosInstance from '@/router/axios';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axiosInstance.post('/api/auth/login', {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem('token', response.data.jwt);
    router.push('/post');
  } catch (error) {
    console.error('Failed to login', error);
  }
};
</script>
