import axiosClient from "./axios";

export const askAgent = async(question, username, session_id, top_k =  50 ) => {
    const res = await axiosClient.post("/ask/", {question, top_k, username,session_id})
    return res.data
}

// export const clearChatHistory = async(sessionId) => {
//     const res = await api.post("/clear-history", {session_id: sessionId})
//     return res.data
// }