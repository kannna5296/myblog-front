// import axios, { AxiosInstance } from 'axios';

// // 共通Axiosインスタンスを作成
// const axiosInstance: AxiosInstance = axios.create({
//     baseURL: 'https://api.example.com', // ベースURLを設定
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true, // Cookieを送信する場合
// });

// // リクエストインターセプターでカスタムヘッダーを追加
// axiosInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token'); // 例: トークンを取得
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, (error) => Promise.reject(error));

// export default axiosInstance;
