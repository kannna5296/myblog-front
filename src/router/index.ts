import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/UserLogin.vue";
import Register from "../components/UserRegister.vue";
import PostList from "../components/PostList.vue";
import PostDetail from "../components/PostDetail.vue";
import CreatePost from "../components/CreatePost.vue";
import EditPost from "../components/EditPost.vue";
import HelloWorld from "@/components/HelloWorld.vue";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/posts", component: PostList },
  { path: "/posts/:id", component: PostDetail },
  { path: "/posts/create", component: CreatePost },
  { path: "/posts/edit/:id", component: EditPost },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
