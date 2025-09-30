import React from "react";
import { Layout } from "antd";
import ReportInput from "../components/ReportInput";
import ReportList from "../components/ReportList";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";

const { Sider, Content } = Layout;

const MainPage = () => {
  return (
    <Layout 
      style={{ 
        height: "100vh", 
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden"
      }}
    >
      {/* Sidebar trái: Logout */}
      <Sider 
        width={200} 
        style={{ 
          background: "#fff", 
          borderRight: "1px solid #f0f0f0",
          overflow: "auto"
        }}
      >
        <SidebarLeft />
      </Sider>

      {/* Content chính */}
      <Layout style={{ flex: 1 }}>
        <Content 
          style={{ 
            padding: "20px", 
            display: "flex", 
            flexDirection: "column",
            gap: "20px",
            overflow: "auto",
            background: "#f5f5f5"
          }}
        >
          <div style={{ flex: 1, overflow: "auto" }}>
            <ReportList />
          </div>
          <div style={{ flex: "0 0 auto" }}>
            <ReportInput />
          </div>
        </Content>
      </Layout>

      {/* Sidebar phải: Ô hỏi sếp */}
      <Sider 
        width={300} 
        style={{ 
          background: "#fff", 
          borderLeft: "1px solid #f0f0f0",
          overflow: "auto"
        }}
      >
        <SidebarRight />
      </Sider>
    </Layout>
  );
};

export default MainPage;