<template>
  <div>
    <h2>Edit Post</h2>
    <form @submit.prevent="editPost">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="title" required />
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea v-model="content" required></textarea>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const title = ref("");
const content = ref("");

const fetchPost = async () => {
  try {
    const response = await axios.get(`/api/posts/${route.params.id}`);
    title.value = response.data.title;
    content.value = response.data.content;
  } catch (error) {
    console.error("Failed to fetch post", error);
  }
};

const editPost = async () => {
  try {
    await axios.put(`/api/posts/${route.params.id}`, {
      title: title.value,
      content: content.value,
    });
    router.push("/posts");
  } catch (error) {
    console.error("Failed to edit post", error);
  }
};

onMounted(() => {
  fetchPost();
});
</script>
