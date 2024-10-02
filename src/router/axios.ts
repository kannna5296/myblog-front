import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  // 他の設定もここに追加できます
});

export default axiosInstance;
