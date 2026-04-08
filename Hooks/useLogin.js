import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../src/api/auth";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const executeLogin = async (username, password, remember = false) => {
        setIsLoading(true);
        setError(null);

        try {
            // Hàm login trong auth.js đã xử lý việc lưu token vào đúng storage
            // dựa theo tham số remember, nên ở đây chỉ cần truyền vào là xong
            const response = await login(username, password, remember);

            if (response?.access_token) {
                navigate("/", { replace: true });
            } else {
                setError("Hệ thống không cấp được token. Vui lòng thử lại.");
            }
        } catch (err) {
            if (!err.response) {
            setError("Không thể kết nối đến server");
            return;
    }
            const detail = err?.response?.data?.detail;

            // Phân biệt lỗi sai username vs sai password nếu BE trả về đủ thông tin
            if (typeof detail === 'string') {
                setError(detail);
            } else if (Array.isArray(detail)) {
                setError(detail.map(d => d.msg).join(', '));
            } else {
                setError("Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { executeLogin, isLoading, error };
};