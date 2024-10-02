import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/components/HelloWorld.vue'),
  },
  {
    path: '/login',
    component: () => import('@/components/UserLogin.vue'),
  },
  {
    path: '/register',
    component: () => import('@/components/UserRegister.vue'),
  },
  {
    path: '/post',
    component: () => import('@/components/PostList.vue'),
  },
  {
    path: '/post/:id',
    component: () => import('@/components/PostDetail.vue'),
  },
  {
    path: '/post/create',
    component: () => import('@/components/CreatePost.vue'),
  },
  {
    path: '/post/edit/:id',
    component: () => import('@/components/EditPost.vue'),
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
