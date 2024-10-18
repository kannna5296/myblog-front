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
import { PostRepository } from '@/repositories/generated/services/PostRepository';

const route = useRoute();
const router = useRouter();
const title = ref('');
const content = ref('');

const id = route.params.id.toString();

const fetchPost = async () => {
  await PostRepository.detail({ id }).then((response) => {
    title.value = response.title;
    content.value = response.content;
  }).catch((error) => {
    console.error('Failed to fetch post', error);
  });
};

const editPost = async () => {
  try {
    await PostRepository.edit(
      {
        id,
        requestBody: {
          title: title.value,
          content: content.value,
          userId: '1', // TODO ここはログインユーザーのIDを入れる
        },
      },
    );
    router.replace({ name: 'postDetail', params: { id } });
    alert('データが正常に更新されました'); // TODO ちゃんと画面にするかVuetifyでアラート
  } catch (error) {
    console.error('Failed to edit post', error);
  }
};

fetchPost();
</script>
