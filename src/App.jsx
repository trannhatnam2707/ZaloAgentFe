import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import MainPage from "./page/MainPage";

function App() {
  // Check nếu đã login (có user_id trong localStorage)
  const isAuthenticated = !!localStorage.getItem("user_id");

  return (
    <BrowserRouter>
      <Routes>
        {/* Nếu đã login thì chuyển sang / */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />}
        />

        {/* MainPage - bắt buộc phải login mới vào được */}
        <Route
          path="/"
          element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
