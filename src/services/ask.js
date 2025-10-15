import api from "./axios"

export const askAgent = async(question, username) => {
    const res = await api.post("/ask", {question, top_k: 50, username})
    return res.data
}

export const clearChatHistory = async(sessionId) => {
    const res = await api.post("/clear-history", {session_id: sessionId})
    return res.data
}