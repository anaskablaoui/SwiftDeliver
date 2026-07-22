import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the access token to every outgoing request
api.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem('accesstoken');
  if (accessToken) {
    config.headers.accessToken = accessToken;
  }
  return config;
});

// Shared in-flight refresh promise so parallel 401s trigger a single /auth/refresh call
let refreshPromise = null;

const logout = () => {
  sessionStorage.removeItem('accesstoken');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('role');
  window.location.href = '/';
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const isAuthEndpoint = originalRequest.url?.includes('/auth/refresh') || originalRequest.url?.includes('/auth/login');

    if (status !== 401 || isAuthEndpoint || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!refreshPromise) {
      const refreshToken = sessionStorage.getItem('refreshToken');
      refreshPromise = axios
        .post(`${API_URL}/auth/refresh`, {}, { headers: { refreshToken } })
        .then((response) => {
          sessionStorage.setItem('accesstoken', response.data.accessToken);
          return response.data.accessToken;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    try {
      const newAccessToken = await refreshPromise;
      originalRequest.headers.accessToken = newAccessToken;
      return api(originalRequest);
    } catch (refreshError) {
      logout();
      return Promise.reject(refreshError);
    }
  }
);

export default api;
