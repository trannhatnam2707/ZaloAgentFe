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
      const userId = localStorage.getItem("user_id");
      
      if (userId) {
        await logout(userId); // Thử gọi API
      }
      
      // Dù API thành công hay thất bại, vẫn logout ở FE
      localStorage.clear();
      message.success("Đăng xuất thành công");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      
      // Vẫn clear localStorage và redirect dù có lỗi
      localStorage.clear();
      message.info("Đã đăng xuất");
      navigate("/login");
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