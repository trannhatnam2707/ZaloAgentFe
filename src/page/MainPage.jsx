import React from "react";
import { Layout } from "antd";
import ReportInput from "../components/ReportInput";
import ReportList from "../components/ReportList";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";

const { Sider, Content } = Layout;

const MainPage = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      {/* Sidebar trái: Logout */}
      <Sider width={200} style={{ background: "#fff", borderRight: "1px solid #f0f0f0" }}>
        <SidebarLeft />
      </Sider>

      {/* Content chính */}
      <Layout>
        <Content style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
          <ReportList />
          <ReportInput />
        </Content>
      </Layout>

      {/* Sidebar phải: Ô hỏi sếp */}
      <Sider width={300} style={{ background: "#fff", borderLeft: "1px solid #f0f0f0" }}>
        <SidebarRight />
      </Sider>
    </Layout>
  );
};

export default MainPage;
