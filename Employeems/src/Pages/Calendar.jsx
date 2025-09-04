import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Typography, Card } from "@mui/material";

// ✅ Only import plugin styles
import "@fullcalendar/daygrid";

export default function CalendarPage() {
  const events = [
    { title: "Present(Remote In)", date: "2025-09-01", color: "green" },
    { title: "Absent", date: "2025-09-02", color: "red" },
    { title: "Present(Remote In)", date: "2025-09-03", color: "green" },
    { title: "Thiruvonam (Holiday)", date: "2025-09-05", color: "blue" },
    { title: "Third Onam (Holiday)", date: "2025-09-06", color: "blue" },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Card sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          September 2025 Calendar
        </Typography>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto"
          events={events}
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "",
          }}
          dayCellDidMount={(arg) => {
            if (arg.date.getDay() === 0) {
              arg.el.style.backgroundColor = "#FFE5B4"; // Sundays light orange
            }
          }}
        />
      </Card>
    </Box>
  );
}

