import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../src/api/auth";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const executeLogin = async (username, password, remember) => {
        setIsLoading(true);
        setError(null);

        try {
           const response = await login(username, password, remember);

           if(response && response.access_token) {
                const storage = remember ? localStorage : sessionStorage;
                storage.setItem("access_token", response.access_token);
                if (response.id) storage.setItem("user_id", response.id);
                // Nếu BE trả về user_info thì lưu luôn
                if (response.user) storage.setItem("user_info", JSON.stringify(response.user));

                navigate("/", { replace: true });
           } else {
                setError("Hệ thống không cấp được token.");
           }
        } 
        catch (err) {
            // BẮT LỖI SAI TÀI KHOẢN/MẬT KHẨU
            if (err.response && (err.response.status === 400 || err.response.status === 401)) {
                setError("Tài khoản hoặc mật khẩu không chính xác!");
            } else {
                setError(err.response?.data?.detail || "Đăng nhập thất bại. Vui lòng thử lại!");
            }
        }   
        finally {
            setIsLoading(false);
        }
    };
    
    return { executeLogin, isLoading, error };   
}