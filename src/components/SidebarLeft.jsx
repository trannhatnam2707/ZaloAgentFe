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
      if (userId) {
        await logout(userId); // gọi API logout
      }
      localStorage.clear(); // xoá hết localStorage
      message.success("Đăng xuất thành công")
      navigate("/users/login"); // quay về trang login
    } catch (err) {
        console.error(err);
        message.error("Đăng xuất thất bại!");
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
