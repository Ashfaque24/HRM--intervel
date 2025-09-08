// import React from 'react';
// import { Typography } from '@mui/material';

// export default function LeaveBalance() {
//   return <Typography variant="h5">Leave Balance Page</Typography>;
// }

import React, { useState } from "react";
import leaveSummaryData from "../Data/LeaveSummaryData";

export default function LeaveBalance() {
  const [year, setYear] = useState(2025);

  // Find data for the selected year
  const yearData =
    leaveSummaryData.find((item) => item.year === year) || leaveSummaryData[0];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Year Selector */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setYear(year - 1)}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ◀
        </button>
        <h2 style={{ margin: 0 }}>{year} Leave Balance</h2>
        <button
          onClick={() => setYear(year + 1)}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ▶
        </button>
      </div>

      {/* Leave Cards */}
      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          paddingRight: "8px",
        }}
      >
        {yearData.leaveTypes.map((leave, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#e0f7fa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  color: "#00796b",
                }}
              >
                {/* Placeholder Icon — can replace dynamically */}
                🗓
              </div>
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                {leave.leaveType}
              </span>
            </div>
            <div style={{ textAlign: "right", fontSize: "14px" }}>
              <div>
                <strong style={{ color: "green" }}>{leave.available}</strong> days
                available
              </div>
              <div>
                <strong style={{ color: "red" }}>{leave.booked}</strong> days booked
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
