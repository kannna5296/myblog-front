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
import axiosInstance from '@/router/axios';
import { useRouter } from 'vue-router';

const title = ref('');
const content = ref('');

const router = useRouter();

const getCsrfToken = () => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
  return cookieValue;
};

const createPost = async () => {
  try {
    const jwtToken = localStorage.getItem('token');
    const response = await axiosInstance.post(// awaitしないと詳細画面でうまく最新化されない
      '/api/post',
      {
        title: title.value,
        content: content.value,
        userId: '1', // TODO あとでユーザ情報拾う
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'X-XSRF-TOKEN': getCsrfToken(),
        },
      },
    );
    router.replace({ name: 'postDetail', params: { id: response.data.postId } });
  } catch (error) {
    console.error('Failed to create post', error);
  }
};
</script>
