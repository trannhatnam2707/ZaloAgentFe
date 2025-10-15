import React, { useRef, useEffect, useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import {
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";

const HeaderBar = () => {
  const username = localStorage.getItem("username");
  const location = useLocation();
  const navRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const handleLogout = async () => {
    try {
      localStorage.removeItem("username");
      localStorage.removeItem("user_id");
      window.location.reload();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Dropdown menu cho user
  const userMenu = (
    <Menu>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
      >
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  // Cập nhật vị trí line highlight khi đổi route
  useEffect(() => {
    const current = navRefs.current[location.pathname];
    if (current) {
      setIndicatorStyle({
        left: current.offsetLeft,
        width: current.offsetWidth,
      });
    }
  }, [location.pathname]);

  return (
    <div
      style={{
        height: "60px",
        width: "100%",
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: "#3366FF", // xanh kiểu Zalo
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxSizing: "border-box",
        minWidth: "320px",
        fontFamily: `"Segoe UI", Roboto, Helvetica, Arial, sans-serif`, // ép chung font
      }}
    >
      {/* Navigation */}
      <div style={{ position: "relative", display: "flex", gap: "30px" }}>
        {/* Thanh highlight */}
        <span
          style={{
            position: "absolute",
            bottom: "-2px",
            height: "3px",
            background: "#fff",
            borderRadius: "2px",
            transition: "all 0.3s ease",
            ...indicatorStyle,
          }}
        />

        <NavLink
          to="/"
          ref={(el) => (navRefs.current["/"] = el)}
          style={({ isActive }) => ({
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: isActive ? "bold" : "normal",
            color: "#fff",
            padding: "6px 0",
          })}
        >
          Trang chính
        </NavLink>

        <NavLink
          to="/ChatBotPage"
          ref={(el) => (navRefs.current["/ChatBotPage"] = el)}
          style={({ isActive }) => ({
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: isActive ? "bold" : "normal",
            color: "#fff",
            padding: "6px 0",
          })}
        >
          Chatbot
        </NavLink>
      </div>

      {/* User dropdown */}
      <Dropdown overlay={userMenu} trigger={["click"]}>
        <Button
          type="text"
          icon={<UserOutlined />}
          style={{
            padding: "4px 8px",
            height: "32px",
            fontSize: "14px",
            flexShrink: 0,
            minWidth: "auto",
            color: "#fff",
          }}
        >
          <span
            style={{
              maxWidth: "100px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "#fff",
            }}
          >
            {username || "User"}
          </span>
          <DownOutlined style={{ marginLeft: "4px", color: "#fff" }} />
        </Button>
      </Dropdown>
    </div>
  );
};

export default HeaderBar;
