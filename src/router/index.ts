import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'userLogin',
    component: () => import('@/components/UserLogin.vue'),
  },
  {
    path: '/register',
    name: 'userRegister',
    component: () => import('@/components/UserRegister.vue'),
  },
  {
    path: '/post',
    name: 'postList',
    component: () => import('@/components/PostList.vue'),
  },
  {
    path: '/post/:id',
    name: 'postDetail',
    component: () => import('@/components/PostDetail.vue'),
  },
  {
    path: '/post/create',
    name: 'postCreate',
    component: () => import('@/components/CreatePost.vue'),
  },
  {
    path: '/post/edit/:id',
    name: 'postEdit',
    component: () => import('@/components/PostEdit.vue'),
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/components/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
