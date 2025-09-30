import { Button, Card, DatePicker, Input, message } from 'antd'
import React, { useState } from 'react'
import dayjs from "dayjs";
import { createReports } from '../services/reports'

const { TextArea} = Input

const ReportInput = ({onReportAdded}) => {
 
  const [yesterday, setYesterday] = useState("")
  const [today, setToday] = useState("")
  const [date, setDate] = useState(dayjs())
  const [loading, setLoading] = useState(false)

  const handleSubmit = async() => {
  if(!today) {
    message.error("Vui lòng nhập task hôm nay!");
    return;
  }

  try {
    setLoading(true);
    const username = localStorage.getItem("username"); // ← Lấy username thay vì user_id
    
    if(!username) {
      message.error("Không tìm thấy username. Vui lòng đăng nhập lại");
      return;
    }

    const reportData = {
      user_name: username,  // ← Đổi từ user_id sang user_name
      date: date.format("YYYY-MM-DD"),
      yesterday: yesterday || "",
      today: today
    };

    const res = await createReports(reportData);
    message.success("Gửi report thành công");
    
    setYesterday("");
    setToday("");
    setDate(dayjs());

    if(onReportAdded) {
      onReportAdded(res);
    }
  }
  catch (err) {
    console.error("Lỗi khi gửi report:", err);
    message.error(err.response?.data?.detail || "Không thể gửi report");
  }
  finally {
    setLoading(false);
  }
}

  return (
    <Card
        style={{
            padding: "12px",
            borderTop: "1px solid #f0f0f0",
            background: "#fff"
        }}
    >

        <DatePicker
            value={date}
            onChange={(val) => setDate(val)}
            format="YYYY-MM-DD"
            style={{
                 marginBottom: "10px", width: "100px"
            }}
        />  

        <TextArea
            rows={5}
            placeholder='Hôm qua bạn làm gì ?'
            value={yesterday}
            onChange={(e) => setYesterday(e.target.value)}
            style={{marginBottom: "8px"}}
        />
        <TextArea
            rows={5}
            placeholder='Hôm nay bạn làm gì ?'
            value={today}
            onChange={(e) => setToday(e.target.value)}
            style={{marginBottom: "8px"}}
        />
        <Button
            type='primary'
            onClick={handleSubmit}
            loading={loading}
            block
        >
            Send
        </Button>
    </Card>
  )
}

export default ReportInput