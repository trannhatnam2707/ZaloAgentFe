import api from "./axios"

export const askAgent = async(question) =>  {
    const res = await api.post("/ask", question)
    return res.data
}