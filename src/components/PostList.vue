<script setup lang="ts">
import { ref } from 'vue';
import { PostRepository } from '@/repositories/generated/services/PostRepository';
import { PostIndexResponse } from '@/repositories/generated';

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
</script>

<template>
  <div>
    <v-container>
      <div class="text-h4">
        Posts
      </div>
      <v-list>
        <!-- 各ポストをカードとして表示 -->
        <v-card
          v-for="(post, index) in posts"
          :key="index"
          class="mb-4"
          elevation="2"
          tag="router-link"
          :to="`/post/${post.postId}`"
        >
          <v-card-content>
            <!-- タイトル部分 -->
            <v-card-title>
              {{ post.title }}
            </v-card-title>
          </v-card-content>
        </v-card>
      </v-list>
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
  </div>
</template>

<style lang="css">
ul {
  list-style: none;
}
</style>
