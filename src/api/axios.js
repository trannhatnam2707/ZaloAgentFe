
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_AI_API_BASE_URL || "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});


// 1. REQUEST INTERCEPTOR: Chặn mọi request trước khi gửi lên BE
axiosClient.interceptors.request.use(
  (config) => {
   const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    if (token) {
      // Gắn token vào Header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hàng đợi cho trường hợp có nhiều API gọi cùng lúc khi đang refresh token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 2. RESPONSE INTERCEPTOR: Chặn kết quả từ BE trả về
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Bắt lỗi 401 (Unauthorized - Hết hạn Access Token)
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Trường hợp 1: Nếu hệ thống ĐANG TRONG QUÁ TRÌNH gọi refresh token
      // Đưa các API bị rớt vào hàng đợi (Queue), chờ có token mới thì chạy tiếp
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = 'Bearer ' + token;
          return axiosClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      // Trường hợp 2: Bắt đầu đi xin Refresh Token
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");
        if (!refreshToken) {
          throw new Error("Không có refresh token");
        }

        // GỌI API REFRESH TOKEN LÊN BACKEND
        // Lưu ý: Dùng axios mặc định, KHÔNG DÙNG axiosClient để tránh bị vòng lặp vô tận
        const res = await axios.post(`${axiosClient.defaults.baseURL}/users/refresh-token`, {
          refresh_token: refreshToken
        });

        // Backend trả về access_token mới
        const newAccessToken = res.data.access_token; 
        
        // Cập nhật lại vào localStorage
        localStorage.setItem('access_token', newAccessToken);

        // Chạy lại các request đang nằm chờ trong Queue
        processQueue(null, newAccessToken);

        // Gắn token mới vào request ban đầu bị lỗi và GỬI LẠI
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);

      } catch (refreshError) {
        // NẾU REFRESH TOKEN CŨNG HẾT HẠN HOẶC LỖI
        processQueue(refreshError, null);
        
        // 1. Xóa sạch dữ liệu cũ
        localStorage.clear();
        
        // 2. Đá văng về trang Login
        window.location.href = '/login';
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false; // Xong quy trình
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;


