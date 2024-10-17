import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { OpenAPI } from './repositories/generated/core/OpenAPI';

createApp(App).use(store).use(router).mount('#app');

// トークンをヘッダーに追加する設定
// 別ファイルにしたい
OpenAPI.HEADERS = async () => {
  const token = localStorage.getItem('token'); // トークンを取得
  return {
    Authorization: `Bearer ${token}`,
    // TODO CsrfTokenを取得して追加する
  };
};
