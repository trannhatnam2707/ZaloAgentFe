import axiosClient from "./axios"


export const createReports = async(reportData) => {
    const res = await axiosClient.post("/reports/", reportData)
    return res.data
}
export const getReportsByConversation = async(conversationId) => {
    const res = await axiosClient.get(`/reports/conversation/${conversationId}`)
    return res.data
};


export const updateReport = async(reportId, updateData) => {
    const res = await axiosClient.put(`/reports/${reportId}`, updateData)
    return res.data
}

export const getReportsByUser =  async(userID) => {
    const res = await axiosClient.get(`/reports/user/${userID}`)
    return res.data
}

export const deleteReports = async(reportId) => {
    const res = await axiosClient.delete(`/reports/${reportId}`)
}