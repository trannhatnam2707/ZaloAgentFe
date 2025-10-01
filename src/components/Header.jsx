import React from "react";
import { Dropdown, Menu, Button } from "antd";
import {
  DownOutlined,
  LogoutOutlined,
  HomeOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";

const HeaderBar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

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
        background: "#fafafa",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxSizing: "border-box",
        minWidth: "320px", // Đảm bảo header không bị quá nhỏ
      }}
    >
      {/* Logo */}
      <div style={{ 
        fontSize: "18px", 
        fontWeight: "bold",
        flexShrink: 0, // Không cho logo bị co lại
        minWidth: "120px"
      }}>
        ZaloAgentFE
      </div>

      {/* Navigation + User */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "12px", // Giảm gap để tiết kiệm không gian
        flexShrink: 1, // Cho phép co lại khi cần
        minWidth: 0, // Cho phép flex item co lại
        overflow: "hidden" // Ẩn nội dung bị overflow
      }}>
        {/* Điều hướng */}
        <NavLink
          to="/"
          style={({ isActive }) => ({
            textDecoration: "none",
            flexShrink: 0, // Không cho button bị co lại
          })}
        >
          {({ isActive }) => (
            <Button
              type="text"
              icon={<HomeOutlined />}
              style={{
                color: isActive ? "#1677ff" : "inherit",
                fontWeight: isActive ? "bold" : "normal",
                padding: "4px 8px", // Giảm padding
                height: "32px", // Giảm height
                fontSize: "14px", // Giảm font size
              }}
            >
              <span style={{ display: "none" }}>Trang chính</span>
            </Button>
          )}
        </NavLink>

        <NavLink
          to="/ChatBotPage"
          style={({ isActive }) => ({
            textDecoration: "none",
            flexShrink: 0, // Không cho button bị co lại
          })}
        >
          {({ isActive }) => (
            <Button
              type="text"
              icon={<MessageOutlined />}
              style={{
                color: isActive ? "#1677ff" : "inherit",
                fontWeight: isActive ? "bold" : "normal",
                padding: "4px 8px", // Giảm padding
                height: "32px", // Giảm height
                fontSize: "14px", // Giảm font size
              }}
            >
              <span style={{ display: "none" }}>Chatbox</span>
            </Button>
          )}
        </NavLink>

        {/* User dropdown */}
        <Dropdown overlay={userMenu} trigger={["click"]}>
          <Button 
            type="text" 
            icon={<UserOutlined />}
            style={{
              padding: "4px 8px",
              height: "32px",
              fontSize: "14px",
              flexShrink: 0, // Không cho user button bị co lại
              minWidth: "auto",
            }}
          >
            <span style={{ 
              maxWidth: "100px", 
              overflow: "hidden", 
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}>
              {username || "User"}
            </span>
            <DownOutlined style={{ marginLeft: "4px" }} />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderBar