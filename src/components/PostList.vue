<script setup lang="ts">
import { ref } from 'vue';
import { PostRepository } from '@/repositories/generated/services/PostRepository';
import { PostIndexResponse } from '@/repositories/generated';
import { formatDateString } from '@/utils';

// TODO 401だったらログイン画面にリダイレクト。共通処理として作る
const posts = ref<PostIndexResponse[]>([]);

const fetchPosts = async () => {
  await PostRepository.index().then((response) => {
    posts.value.push(...response);
  }).catch((error) => {
    console.error('Failed to fetch posts', error);
  });
};

fetchPosts();
const headers = [
  { align: 'center', title: 'タイトル', value: 'title' } as const,
  { align: 'center', title: 'ID', value: 'postId' } as const,
  { align: 'center', title: '日付', value: 'createdAt' } as const,
];

</script>

<template>
  <v-container>
    <div class="d-flex flex-row">
      <div class="text-h4 ma-4">
        投稿一覧
      </div>
      <!-- TODO outlined/fulfill、色を差し替えられるようにコンポーネント化したい -->
      <v-btn
        class="ma-4 w-10 custom-btn"
        outlined
        :to="'/post/create'"
      >
        投稿する
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="posts"
      class="elevation-1"
    >
      <template #item="{ item }">
        <tr>
          <td>
            <router-link
              :to="{ name: 'postDetail', params: { id: item?.postId } }"
              class="link-style"
            >
              {{ item.title }}
            </router-link>
          </td>
          <td>{{ item.postId }}</td>
          <td>{{ formatDateString(item.createdAt) }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
  <li v-if="posts.length === 0">
    投稿がありません！
  </li>
</template>

<style lang="css">
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

.link-style {
  color: blue; /* 青文字 */
  text-decoration: none; /* リンクの下線を消す */
}

.link-style:hover {
  text-decoration: underline; /* ホバー時に下線 */
}

.custom-btn {
  color: blue;  /* 文字を青色に */
  background-color: white; /* 背景を白に */
  border: 1px solid blue; /* 枠線を青に */
}
</style>
