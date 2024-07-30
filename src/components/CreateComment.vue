<template>
  <div>
    <h3>Add Comment</h3>
    <form @submit.prevent="createComment">
      <div>
        <textarea v-model="content" required></textarea>
      </div>
      <button type="submit">Add Comment</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axiosInstance from '@/router/axios';

const content = ref("");
const postId = ref<number>(1); // Replace with actual post ID

const createComment = async () => {
  try {
    await axiosInstance.post(`/api/post/${postId.value}/comment`, {
      content: content.value,
    });
    content.value = "";
    // Optionally, fetch comments again or update the comment list
  } catch (error) {
    console.error("Failed to create comment", error);
  }
};
</script>
