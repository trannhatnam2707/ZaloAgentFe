import { Button, Card, DatePicker, Input, message } from 'antd'
import React, { useState } from 'react'
import dayjs from "dayjs";
import { createReports } from '../services/reports'

const { TextArea } = Input

const ReportInput = ({ onReportAdded }) => {
  const [yesterday, setYesterday] = useState("")
  const [today, setToday] = useState("")
  const [date, setDate] = useState(dayjs())
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!today) {
      message.error("Vui lòng nhập task hôm nay!");
      return;
    }

    // ✅ Lưu giá trị trước khi xóa
    const reportData = {
      user_name: localStorage.getItem("username"),
      date: date.format("YYYY-MM-DD"),
      yesterday: yesterday || "",
      today: today
    };

    // ✅ Xóa input NGAY LẬP TỨC khi nhấn Send
    setYesterday("");
    setToday("");
    setDate(dayjs());

    try {
      setLoading(true);
      
      const username = localStorage.getItem("username");
      
      if (!username) {
        message.error("Không tìm thấy username. Vui lòng đăng nhập lại");
        return;
      }

      const res = await createReports(reportData);
      message.success("Gửi report thành công");

      if (onReportAdded) {
        onReportAdded(res);
      }
    }
    catch (err) {
      console.error("Lỗi khi gửi report:", err);
      message.error(err.response?.data?.detail || "Không thể gửi report");
      
      // ❌ Nếu lỗi thì restore lại giá trị
      setYesterday(reportData.yesterday);
      setToday(reportData.today);
      setDate(dayjs(reportData.date));
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Card
      style={{
        padding: "10px",
        borderTop: "1px solid #f0f0f0",
        background: "#fff",
        height: "25vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end"
      }}
    >
      {/* Hàng 1: Hôm qua + Date */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <TextArea
          rows={2}
          placeholder="Hôm qua bạn làm gì ?"
          value={yesterday}
          onChange={(e) => setYesterday(e.target.value)}
          disabled={loading}
        />
        <DatePicker
          value={date}
          onChange={(val) => setDate(val)}
          format="YYYY-MM-DD"
          style={{ width: "140px" }}
          disabled={loading}
        />
      </div>

      {/* Hàng 2: Hôm nay + Send */}
      <div style={{ display: "flex", gap: "8px" }}>
        <TextArea
          rows={2}
          placeholder="Hôm nay bạn làm gì ?"
          value={today}
          onChange={(e) => setToday(e.target.value)}
          disabled={loading}
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          style={{
            width: "140px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px",
            height: "50px"
          }}
        >
          Send
        </Button>
      </div>
    </Card>
  )
}

export default ReportInput