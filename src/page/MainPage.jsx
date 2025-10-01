import React, { useRef } from "react";
import { Layout } from "antd";
import ReportInput from "../components/ReportInput";
import ReportList from "../components/ReportList";
import HeaderBar from "../components/Header";

const { Content } = Layout;

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
        overflow: "hidden",
      }}
    >
      {/* Header luôn cố định trên cùng */}
      <HeaderBar />

      {/* Nội dung chính */}
      <Content
        style={{
          marginTop: "60px", // chừa khoảng trống cho header
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          overflow: "hidden",
          background: "#f5f5f5",
          height: "calc(100vh - 60px)", // trừ header
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
  );
};

export default MainPage;
