<template>
  <div>
    <h2>Edit Post</h2>
    <form @submit.prevent="editPost">
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
        Save
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '@/router/axios';

const route = useRoute();
const router = useRouter();
const title = ref('');
const content = ref('');

const { id } = route.params;

const fetchPost = async () => {
  try {
    const jwtToken = localStorage.getItem('token');
    const response = await axiosInstance.get(`/api/post/${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    title.value = response.data.title;
    content.value = response.data.content;
  } catch (error) {
    console.error('Failed to fetch post', error);
  }
};

const getCsrfToken = () => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
  return cookieValue;
};

const editPost = async () => {
  try {
    const jwtToken = localStorage.getItem('token');
    axiosInstance.put(
      `/api/post/${id}`,
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
    // alert('データが正常に更新されました');
    // TODO うまくDetail側が更新されない
    router.push({ name: 'postDetail', params: { id } });
  } catch (error) {
    console.error('Failed to edit post', error);
  }
};

fetchPost();
</script>
