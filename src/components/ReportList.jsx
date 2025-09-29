import React, { useEffect, useState } from "react";
import { Card, Input, Button, message, Modal, Spin, DatePicker } from "antd";
import dayjs from "dayjs";
import { getReports, updateReport } from "../services/reports";

const { TextArea } = Input;

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReport, setEditingReport] = useState(null);
  const [editYesterday, setEditYesterday] = useState("");
  const [editToday, setEditToday] = useState("");
  const [editDate, setEditDate] = useState(null);

  const currentUserId = localStorage.getItem("user_id");

  // Load tất cả report
  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await getReports();
      setReports(data);
    } catch (err) {
      console.error("Lỗi khi load reports:", err);
      message.error("Không thể tải danh sách report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Khi click vào report của chính mình để update
  const handleEdit = (report) => {
    setEditingReport(report);
    setEditYesterday(report.yesterday);
    setEditToday(report.today);
    setEditDate(dayjs(report.date)); // convert string -> dayjs
  };

  // Gửi update lên server
  const handleUpdate = async () => {
    try {
      if (!editToday) {
        message.error("Vui lòng nhập task hôm nay!");
        return;
      }
      if (!editYesterday){
        message.error("Vui lòng nhập task hôm qua!");
        return;
      }
      if (!editDate) {
        message.error("Vui lòng chọn ngày!");
        return;
      }

      const updated = await updateReport(editingReport.id, {
        yesterday: editYesterday,
        today: editToday,
        date: editDate.format("YYYY-MM-DD"), // format theo chuẩn BE
      });

      message.success("Cập nhật report thành công");

      // cập nhật trong list
      setReports((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );

      setEditingReport(null);
    } catch (err) {
      console.error("Lỗi khi update:", err);
      message.error("Không thể cập nhật report");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin />
      </div>
    );
  }

  return (
    <div
      style={{
        height: "70vh",
        overflowY: "auto",
        padding: "10px",
        background: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      {reports.map((report) => {
        const isMine = report.user_id === currentUserId;
        return (
          <div
            key={report.id}
            style={{
              display: "flex",
              justifyContent: isMine ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <Card
              onClick={() => isMine && handleEdit(report)}
              style={{
                maxWidth: "70%",
                background: isMine ? "#1677ff" : "#fff",
                color: isMine ? "#fff" : "#000",
                cursor: isMine ? "pointer" : "default",
              }}
            >
              <div>
                <b>{report.user_name || "Unknown User"}</b> -{" "}
                <i>{report.date}</i>
              </div>
              <div style={{ marginTop: "5px" }}>
                <p>
                  <b>Hôm qua:</b> {report.yesterday || "Không có"}
                </p>
                <p>
                  <b>Hôm nay:</b> {report.today || "Không có"}
                </p>
              </div>
            </Card>
          </div>
        );
      })}

      {/* Modal update report */}
      <Modal
        open={!!editingReport}
        title="Chỉnh sửa Report"
        onCancel={() => setEditingReport(null)}
        onOk={handleUpdate}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <DatePicker
          value={editDate}
          onChange={(val) => setEditDate(val)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <TextArea
          rows={3}
          placeholder="Hôm qua bạn làm gì?"
          value={editYesterday}
          onChange={(e) => setEditYesterday(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextArea
          rows={3}
          placeholder="Hôm nay bạn làm gì?"
          value={editToday}
          onChange={(e) => setEditToday(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default ReportList;
