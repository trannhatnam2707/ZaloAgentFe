import axiosClient from "./axios"


export const createReports = async(reportData) => {
    return await axiosClient.post("/reports/", reportData)
}
export const getReportsByConversation = async(conversationId) => {
    return await axiosClient.get(`/reports/conversation/${conversationId}`)
};


export const updateReport = async(reportId, updateData) => {
    return await axiosClient.put(`/reports/${reportId}`, updateData)
}

export const getReportsByUser =  async(userID) => {
    return await axiosClient.get(`/reports/user/${userID}`)
}

export const deleteReports = async(reportId) => {
   return await axiosClient.delete(`/reports/${reportId}`)
}