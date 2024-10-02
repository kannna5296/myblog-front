<template>
  <div>
    <h3>Comments</h3>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        {{ comment.content }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import axiosInstance from '@/router/axios';

interface Comment {
  id: number;
  content: string;
}

const comments = ref<Comment[]>([]);
const postId = ref<number>(1); // Replace with actual post ID

const fetchComments = async () => {
  try {
    const response = await axiosInstance.get(`/api/post/${postId.value}/comment`);
    comments.value = response.data;
  } catch (error) {
    console.error('Failed to fetch comments', error);
  }
};

onMounted(() => {
  fetchComments();
});
</script>
