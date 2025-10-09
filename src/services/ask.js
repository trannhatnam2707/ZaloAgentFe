import api from "./axios"

export const askAgent = async(question,username) =>  {
    const res = await api.post("/ask", {question, top_k: 10, username})
    return res.data
}       