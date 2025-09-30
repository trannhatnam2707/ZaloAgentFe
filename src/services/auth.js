import api from "./axios";

export const register = async(username, password) => {
    const res = await api.post("/users/register", {username, password})
    return res.data
};

export const login = async(username, password) => {
    const res = await api.post("/users/login", { username, password });

    // Lưu user_id và username vào localStorage từ response
    localStorage.setItem("user_id", res.data.id);
    localStorage.setItem("username", res.data.username);

    return res.data; // { id, username }
};

export const logout = async (userId) => {
    const res = await api.post(`/users/logout/${userId}`);
    return res.data;
};

export const getUserByUserName = async( userId ) => {
    const res = await api.get(`/user/${userId}`)
    return res.data
}

