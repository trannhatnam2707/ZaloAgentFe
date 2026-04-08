import axiosClient from "./axios";


export const register = async (userData) => {
    // Nhận vào cục object userData (gồm username, password, email...) 
    // tùy theo cái class UserCreate bên BE của bạn yêu cầu những gì
    return await axiosClient.post("/users/register", userData);
};

export const login = async (username, password, remember = false) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const data = await axiosClient.post("/users/login", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

    const storage = remember ? localStorage : sessionStorage;
    if (data.access_token) {
        storage.setItem("access_token", data.access_token);
        storage.setItem("refresh_token", data.refresh_token);
        storage.setItem("user_info", JSON.stringify(data.user)); 
    }

    return data;
};

export const logout = async () => {
    try {
        await axiosClient.post(`/users/logout`);
    } catch (error) {
        console.error("Lỗi khi báo BE đăng xuất", error);
    } finally {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/login";
    }
};

export const getUserByUserName = async (username) => {
    return await axiosClient.get(`/users/${username}`);
};

export const searchUsers = async (keyword) => {
    // BE đang nhận Query Parameter (?keyword=...)
    return await axiosClient.get(`/users/search`, { 
        params: { keyword } 
    });
};

// Lấy danh sách bạn bè và lời mời kết bạn
export const getFriendsList = async () => {
    return await axiosClient.get("/users/friends/list");
};

// Gửi lời mời kết bạn
export const sendFriendRequest = async (targetUserId) => {
    return await axiosClient.post(`/users/friends/request/${targetUserId}`);
};

// Đồng ý lời mời kết bạn
export const acceptFriendRequest = async (senderId) => {
    return await axiosClient.post(`/users/friends/accept/${senderId}`);
};

// Hủy kết bạn hoặc Từ chối lời mời
export const removeFriendOrRequest = async (targetUserId) => {
    return await axiosClient.delete(`/users/friends/${targetUserId}`);
};

export const getMe = async (current_user) => {
    return await axiosClient.get('/users/getMe/')
}