<template>
  <div>
    <h2>{{ post?.title }}</h2>
    <p>{{ post?.content }}</p>
    <router-link to="/post">Back to Posts</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from '@/router/axios';

interface Post {
  id: number;
  title: string;
  content: string;
}

const route = useRoute();
const post = ref<Post | null>(null);

const fetchPost = async () => {
  try {
    const response = await axiosInstance.get(`/api/post/${route.params.id}`);
    post.value = response.data;
  } catch (error) {
    console.error("Failed to fetch post", error);
  }
};

onMounted(() => {
  fetchPost();
});
</script>
