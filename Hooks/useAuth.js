import React, { useEffect, useState } from 'react'
import { getMe } from '../src/api/auth'


export const useAuth = () => {

    const [isAuth , setIsAuth] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    const verifyToken = async() => {
        const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token")

        if (!token) {
            setIsAuth(false)
            setIsLoading(false)
            console.log("Tài khoản không xác thực")
            return
        }
        try {
            const userData = await getMe()
            setUser(userData)
            console.log("getMe:" , userData)
            setIsAuth(true)
            const hasLocalToken = localStorage.getItem("access_token") !== null
            const storage = hasLocalToken ? localStorage : sessionStorage
            storage.setItem("user_info", JSON.stringify(userData))
        }
        catch (err) {
            console.error("Auth failed: ", err)
            if (err.response?.status === 401) {
                localStorage.clear()
                sessionStorage.clear()
            }
            setIsAuth(false)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        verifyToken();
    },[])

    return {user, isAuth, isLoading, refreshUser: verifyToken}
    }
