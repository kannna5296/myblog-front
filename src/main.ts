import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { OpenAPI } from './repositories/generated/core/OpenAPI';

createApp(App).use(store).use(router).mount('#app');

// トークンをヘッダーに追加する設定
// TODO 別ファイルにしたい
function getCsrfToken() {
  console.log(`cookie!!${document.cookie}`);
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
  console.log('嗚呼あ');
  console.log(`cookie${cookieValue}`);
  return cookieValue;
}

OpenAPI.HEADERS = async () => {
  const token = localStorage.getItem('token'); // トークンを取得
  return {
    Authorization: token ? `Bearer ${token}` : '',
    'X-XSRF-TOKEN': getCsrfToken() || '',
  };
};
