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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const title = ref("");
const content = ref("");
const router = useRouter();

const createPost = async () => {
  try {
    await axios.post("/api/posts", {
      title: title.value,
      content: content.value,
    });
    router.push("/posts");
  } catch (error) {
    console.error("Failed to create post", error);
  }
};
</script>
