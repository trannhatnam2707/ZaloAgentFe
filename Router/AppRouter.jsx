import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../src/page/LoginPage';
import RegisterPage from '../src/page/RegisterPage';
import DashboardPage from '../src/page/DashboardPage';
import { getMe } from '../src/api/auth'; 
import { useAuth } from '../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const {isAuth, isLoading} = useAuth() 
    
    if (isLoading) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <span className="text-gray-600 font-medium animate-pulse">Đang kiểm tra bảo mật...</span>
            </div>
        );
    }

    return isAuth ? children : <Navigate to="/login" replace />;
};
const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    return !token ? children : <Navigate to="/" replace />;
};

const AppRouter = () => {
    return (
            <Routes>
                <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
                <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
    );
};

export default AppRouter;