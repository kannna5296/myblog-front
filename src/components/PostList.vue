<script setup lang="ts">
import { ref } from 'vue';
import { PostRepository } from '@/repositories/generated/services/PostRepository';

interface Post {
  postId: string;
  title: string;
}

// TODO 401だったらログイン画面にリダイレクト。共通処理として作る
const posts = ref<Post[]>([]);

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
    <h2>Posts</h2>
    <ul>
      <li v-if="posts.length === 0">
        投稿がありません！
      </li>
      <li
        v-for="post in posts"
        :key="post.postId"
      >
        <router-link :to="`/post/${post.postId}`">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
    <router-link to="/post/create">
      投稿する
    </router-link>
  </div>
</template>

<style lang="css">
ul {
  list-style: none;
}
</style>
