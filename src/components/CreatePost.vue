<template>
  <div>
    <h2>Create Post</h2>
    <form @submit.prevent="createPost">
      <div>
        <label for="title">Title:</label>
        <input
          v-model="title"
          type="text"
          required
        >
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea
          v-model="content"
          required
        />
      </div>
      <button type="submit">
        Create
      </button>
    </form>
    <router-link to="/post">
      Back to Posts
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axiosInstance from '@/router/axios';

const title = ref('');
const content = ref('');

const createPost = async () => {
  try {
    const jwtToken = localStorage.getItem('token');
    axiosInstance.post(
      '/api/post',
      {
        title: title.value,
        content: content.value,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    );
  } catch (error) {
    console.error('Failed to create post', error);
  }
};
</script>
