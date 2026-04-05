import axiosClient from "./axios";

export const sendMessage = async (data) => {
    return await axiosClient.post("/messages/", data)
}

export const getMessageHistory = async(conversation_id, skip, limit) => {
    return await axiosClient.get(`messages/${conversation_id}`,{
        params: {skip , limit}
    })
}

export const getAiBubbleHistory = async(conversation_id) => {
    return await axiosClient.get(`/messages/ai-bubble/${conversation_id}`)
}
