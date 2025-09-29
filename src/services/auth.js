import api from "./axios";

export const register = async(username, password) => {
    const res = await api.post("/users/register", {username, password})
    return res.data
};

export const login = async(username, password) => {
    const res = await api.post("/users/login", { username, password });

    localStorage.setItem("user_id", id);
    localStorage.setItem("username", username);

    return res.data; // { id, username }
};

export const logout = async (userId) => {
    const res = await api.post("/users/logout", { user_id: userId });
    return res.data;
};

export const getUserByUserName = async( userId ) => {
    const res = await api.get(`/user/${userId}`)
    return res.data
}

