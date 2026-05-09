import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_AI_API_BASE_URL || "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const getAccessToken = () =>
  localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

const getRefreshToken = () =>
  localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");

const saveNewAccessToken = (token) => {
  if (localStorage.getItem("access_token") !== null) {
    localStorage.setItem("access_token", token);
  } else {
    sessionStorage.setItem("access_token", token);
  }
};

// REQUEST INTERCEPTOR
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response.status === 401;
    const isAuthEndpoint =
      originalRequest.url?.includes("/login") ||
      originalRequest.url?.includes("/refresh-token");

    if (!isUnauthorized || isAuthEndpoint) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

      originalRequest._retry = true;
      isRefreshing = true;

    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token found");
      }

      const { data } = await axios.post(`${axiosClient.defaults.baseURL}/users/refresh-token`, {
        refresh_token: refreshToken,
      });

      const newAccessToken = data.access_token;
      saveNewAccessToken(newAccessToken);

      axiosClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      processQueue(null, newAccessToken);

      return axiosClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosClient;