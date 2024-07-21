<template>
  <div>
    <h2>Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface Post {
  id: number;
  title: string;
}

const posts = ref<Post[]>([]);

const fetchPosts = async () => {
  try {
    const response = await axios.get("/api/post");
    posts.value = response.data;
  } catch (error) {
    console.error("Failed to fetch posts", error);
  }
};

onMounted(() => {
  fetchPosts();
});
</script>
