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
import { useRouter } from 'vue-router';
import { PostRepository } from '@/repositories/generated/services/PostRepository';

const title = ref('');
const content = ref('');

const router = useRouter();

const createPost = async () => {
  try {
    const response = await PostRepository.post({
      requestBody: {
        title: title.value,
        content: content.value,
        userId: '1',
      },
    });
    router.replace({ name: 'postDetail', params: { id: response.postId } });
  } catch (error) {
    console.error('Failed to create post', error);
  }
};
</script>
