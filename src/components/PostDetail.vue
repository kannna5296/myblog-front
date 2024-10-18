<template>
  <div>
    <h2>{{ post?.title }}</h2>
    <p>{{ post?.content }}</p>
    <div>
      <router-link to="/post">
        Back to Posts
      </router-link>
    </div>
    <div>
      <router-link :to="{ name: 'postEdit', params: { id: post?.postId } }">
        Edit
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { PostRepository } from '@/repositories/generated/services/PostRepository';
import { PostDetailResponse } from '@/repositories/generated';

const route = useRoute();
const post = ref<PostDetailResponse | null>(null);

const id = route.params.id.toString();

const fetchPost = async () => {
  await PostRepository.detail({ id }).then((response) => {
    post.value = response;
  }).catch((error) => {
    console.error('Failed to fetch post', error);
  });
};

fetchPost();
</script>
