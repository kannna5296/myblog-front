<script setup lang="ts">
import { ref } from 'vue';
import { PostRepository } from '@/repositories/generated/services/PostRepository';
import { PostIndexResponse } from '@/repositories/generated';

// TODO 401だったらログイン画面にリダイレクト。共通処理として作る
const posts = ref<PostIndexResponse[]>([]);

const fetchPosts = async () => {
  await PostRepository.index().then((response) => {
    posts.value = response;
  }).catch((error) => {
    console.error('Failed to fetch posts', error);
  });
};

fetchPosts();

const headers = [
  { align: 'center', title: 'タイトル', value: 'title' } as const,
  { align: 'center', title: 'ID', value: 'postId' } as const,
];
</script>

<template>
  <v-container>
    <div class="text-h4">
      投稿
    </div>
    <v-data-table
      :headers="headers"
      :items="posts"
      class="elevation-1"
    />
    <v-btn
      class="mt-2"
      color="primary"
      block
      :to="'/post/create'"
    >
      投稿する
    </v-btn>
  </v-container>
  <li v-if="posts.length === 0">
    投稿がありません！
  </li>
</template>

<style lang="css" >
.v-data-table tbody tr:nth-child(odd) {
  background-color: #f6f7f7; /* 書こうボーダーの色*/
}

.v-data-table tbody tr:nth-child(even) {
  background-color: #ffffff; /* 白 */
}

.v-data-table thead th {
  border: 1px solid #c4c4c7; /* ヘッダの縁線を太く */
  border-bottom: 1px solid #c4c4c7; /* ヘッダの縁線を太く */
}
/* border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));が邪魔なので消したい */
</style>
