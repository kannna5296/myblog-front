/* eslint-disable import/no-extraneous-dependencies */
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { OpenAPI } from './repositories/generated/core/OpenAPI';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(store).use(router).use(vuetify)
  .mount('#app');

// トークンをヘッダーに追加する設定
// TODO 別ファイルにしたい
function getCsrfToken() {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
  return cookieValue;
}

OpenAPI.HEADERS = async () => {
  const token = localStorage.getItem('token'); // トークンを取得
  return {
    Authorization: token ? `Bearer ${token}` : '',
    'X-XSRF-TOKEN': getCsrfToken() || '',
  };
};
// SET-COOKIEをブラウザが受け取るための設定
OpenAPI.WITH_CREDENTIALS = true;
