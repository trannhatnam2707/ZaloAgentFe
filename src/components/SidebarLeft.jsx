import React from "react";
import { Dropdown, Menu, Button, message } from "antd";
import { DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

const SidebarLeft = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("user_id");

  const handleLogout = async () => {
    try {
      // Dù API thành công hay thất bại, vẫn logout ở FE
      localStorage.removeItem("username");
      localStorage.removeItem("user_id");
      window.location.reload()
    } catch (err) {
      console.error("Logout error:", err)
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        height: "100vh",
        width: "220px",
        borderRight: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafafa",
      }}
    >
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button type="text" icon={<UserOutlined />}>
          {username || "Người dùng"} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default SidebarLeft;