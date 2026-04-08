import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../src/api/auth'

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const executeRegister = async (account, username, password, ReEnterPassword) => {
        setIsLoading(true)
        setError(null)

        try {
            // Gửi đủ 4 trường đúng y bong tên mà FastAPI yêu cầu
            await register({ 
                account: account, 
                username: username, 
                password: password, 
                ReEnterPassword: ReEnterPassword 
            })
            
            // Đăng ký thành công -> Về trang Login
            navigate('/login', { replace: true })
            
        } catch (err) {
            // Phân rã lỗi 422 từ FastAPI để chống sập React
            let errorMessage = "Đăng ký thất bại. Vui lòng thử lại!";

            if (err.response && err.response.data) {
                const detail = err.response.data.detail;

                if (typeof detail === 'string') {
                    errorMessage = detail;
                } else if (Array.isArray(detail)) {
                    console.error("🚨 CHI TIẾT LỖI 422 TỪ FASTAPI:", detail); 
                    const loc = detail[0].loc[detail[0].loc.length - 1]; 
                    errorMessage = `Lỗi dữ liệu ở trường: ${loc}`;
                }
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false)
        }
    }

    return { executeRegister, isLoading, error }
}