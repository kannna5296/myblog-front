<template>
  <div>
    <h2>Create Post</h2>
    <form @submit.prevent="createPost">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="title" required />
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea v-model="content" required></textarea>
      </div>
      <button type="submit">Create</button>
    </form>
    <router-link to="/post">Back to Posts</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from '@/router/axios';

const title = ref("");
const content = ref("");
const router = useRouter();

const createPost = async () => {
  try {
    const jwtToken = localStorage.getItem('token');
    axiosInstance.post('/api/post', 
    {
      title: title.value,
      content: content.value,
    },
    {
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      },
  })
  } catch (error) {
    console.error("Failed to create post", error);
  }
};
</script>
