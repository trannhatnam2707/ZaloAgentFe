import axiosClient from "./axios";

export const getMyConversation = async() => {
    return await axiosClient.get("/conservations/")
}

export const createConversation = async(data) => {
    return await axiosClient.post("/conservations/",data)
}

export const addMember = async(conversations_id, new_member_id) => {
    return await axiosClient.put(`/conservations/${conversations_id}/members/${new_member_id}`)
}

export const kickMember = async(conversations_id, member_to_kick) => {
    return await axiosClient.delete(`/conservations//${conversations_id}/members/${member_to_kick}`)
}