import api from "./axios"

export const getReports = async() => {
    const res = await api.get("/reports")
    return res.data
};

export const createReports = async(reportData) => {
    const res = await api.post("/reports", reportData)
    return res.data
}
    
export const updateReport = async(reportId, updateData) => {
    const res = await api.put(`/reports/${reportId}`, updateData)
    return res.data
}