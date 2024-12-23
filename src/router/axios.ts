import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  // 他の設定もここに追加できます
});

// CookieからCSRFトークンを取得する関数
function getCsrfToken() {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
  return cookieValue;
}

axiosInstance.interceptors.request.use((config) => {
  // CSRFトークンをリクエストヘッダーに追加
  const csrfToken = getCsrfToken();
  if (csrfToken && config.headers) {
    // eslint-disable-next-line no-param-reassign
    config.headers['X-XSRF-TOKEN'] = csrfToken;
  }
  return config;
}, (error) => Promise.reject(error));

export default axiosInstance;
