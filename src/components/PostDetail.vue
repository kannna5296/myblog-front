<template>
  <div>
    <h2>{{ post?.title }}</h2>
    <p>{{ post?.content }}</p>
    <router-link to="/posts">Back to Posts</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
}

const route = useRoute();
const post = ref<Post | null>(null);

const fetchPost = async () => {
  try {
    const response = await axios.get(`/api/posts/${route.params.id}`);
    post.value = response.data;
  } catch (error) {
    console.error("Failed to fetch post", error);
  }
};

onMounted(() => {
  fetchPost();
});
</script>
