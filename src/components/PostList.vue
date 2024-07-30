<script setup lang="ts">
import { ref } from 'vue';
import axiosInstance from '@/router/axios'; 

interface Post {
  postId: string;
  title: string;
}

const posts = ref<Post[]>([]);

const fetchPosts = () => {
  axiosInstance.get('/api/post')
    .then(response => {
      posts.value.push(response.data);
    })
    .catch(error => {
      console.error('Failed to fetch posts', error);
    });
};

fetchPosts();
</script>

<template>
  <div>
    <h2>Posts</h2>
    <ul>
      <li v-if="posts.length === 0">Loading...</li>
      <li v-for="post in posts" :key="post.postId">
        <router-link :to="`/post/${post.postId}`">{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>
