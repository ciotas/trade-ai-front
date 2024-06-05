import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // 设置你的 API 基础 URL
  timeout: 10000, // 设置请求超时时间
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
