import { useState } from "react"
import { replace, useNavigate } from "react-router-dom"
import { login } from "../src/api/auth"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate() 

    const executeLogin = async(username, password) => {
        setIsLoading(true)
        setError(null)

        try {
           const response = await login(username, password);

           const token = response.access_token
           if(token) {
                localStorage.setItem("access_token", token) || sessionStorage.setItem("access_token",token )

                // Lưu thêm id để FE biết mình là ai (phục vụ cho việc chat)
                if (response.id) localStorage.setItem("user_id", response.id) || sessionStorage.setItem("user_id", response.id) ;

                navigate("/" ,{replace: true})
           }
           else {
            setError("Hệ thống không cấp đuộc token")
           }
        } 
        catch (error){
            const errorMsg = error.response?.data?.detail || "Đăng nhập thất bại, vui lòng đăng nhập lại"
            setError(errorMsg)
        }   
        finally {
            setIsLoading(false)
        }
    }
    return {
        executeLogin,
        isLoading,
        error
    }   
}