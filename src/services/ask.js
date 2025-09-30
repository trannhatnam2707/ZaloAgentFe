import api from "./axios"

export const askAgent = async(question) =>  {
    const res = await api.post("/ask", {question, top_k: 5})
    return res.data
}