import React, { useRef } from "react";
import { Layout } from "antd";
import ReportInput from "../components/ReportInput";
import ReportList from "../components/ReportList";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";

const { Sider, Content } = Layout;

const MainPage = () => {
  const reportListRef = useRef(null);

  const handleReportAdded = (newReport) => {
    if (reportListRef.current) {
      reportListRef.current.addNewReport(newReport);
    }
  };

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

      <Layout style={{ flex: 1 }}>
        <Content 
          style={{ 
            padding: "20px", 
            display: "flex", 
            flexDirection: "column",
            gap: "20px",
            overflow: "hidden",
            background: "#f5f5f5",
            height: "100%"
          }}
        >
          <div style={{ flex: 1, minHeight: 0 }}>
            <ReportList ref={reportListRef} />
          </div>
          <div style={{ flex: "0 0 auto" }}>
            <ReportInput onReportAdded={handleReportAdded} />
          </div>
        </Content>
      </Layout>

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