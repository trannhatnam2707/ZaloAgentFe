import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_AI_API_BASE_URL || "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

// 1. REQUEST INTERCEPTOR
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Biến kiểm soát trạng thái refresh
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

// 2. RESPONSE INTERCEPTOR
axiosClient.interceptors.response.use(
  (response) => {
    return response.data; // Trả về data cho FE dùng
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu không có response (lỗi mạng) hoặc request đã retry rồi thì thôi
    if (!error.response || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Nếu là lỗi 401 và không phải là API login
    if (error.response.status === 401 && !originalRequest.url.includes('/login')) {
      
      if (isRefreshing) {
        // Nếu đang có 1 request khác đi lấy token mới, request này đứng đợi vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Đánh dấu bắt đầu quá trình refresh
      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        const refreshToken = localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");

        if (!refreshToken) {
          isRefreshing = false;
          window.location.href = '/login';
          return reject(new Error("No refresh token found"));
        }

        // Dùng axios mặc định để gọi refresh, tránh bị lặp interceptor này
        axios.post(`${axiosClient.defaults.baseURL}/users/refresh-token`, {
          refresh_token: refreshToken
        })
        .then(({ data }) => {
          const newAccessToken = data.access_token;
          
          // Lưu token mới
          localStorage.setItem('access_token', newAccessToken);
          
          // Cập nhật header cho các request sau này
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          
          // Chạy lại request hiện tại
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          
          processQueue(null, newAccessToken);
          resolve(axiosClient(originalRequest));
        })
        .catch((err) => {
          // Nếu refresh token cũng hỏng/hết hạn
          processQueue(err, null);
          localStorage.clear();
          window.location.href = '/login';// axios.js

// Helper để đọc/ghi token nhất quán
const getAccessToken = () =>
  localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

const getRefreshToken = () =>
  localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");

const saveNewAccessToken = (token) => {
  // Ghi đúng nơi đã lưu ban đầu
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

    if (!error.response || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !originalRequest.url.includes("/login") &&
      !originalRequest.url.includes("/refresh-token") // ← Thêm guard này!
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        const refreshToken = getRefreshToken(); // ← dùng helper

        if (!refreshToken) {
          isRefreshing = false;
          window.location.href = "/login";
          return reject(new Error("No refresh token found"));
        }

        axios
          .post(`${axiosClient.defaults.baseURL}/users/refresh-token`, {
            refresh_token: refreshToken,
          })
          .then(({ data }) => {
            const newAccessToken = data.access_token;

            saveNewAccessToken(newAccessToken); // ← ghi đúng storage

            axiosClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            processQueue(null, newAccessToken);
            resolve(axiosClient(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            localStorage.clear();
            sessionStorage.clear(); // ← clear cả hai!
            window.location.href = "/login";
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);
          reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosClient;