import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';

export default function AttendanceWidget({ userId }) {
  const [attendance, setAttendance] = useState(null);

  // Load initial attendance from localStorage or API
  useEffect(() => {
    const savedStatus = localStorage.getItem(`attendance_${userId}`);
    if (savedStatus !== null) {
      setAttendance({ checkedIn: JSON.parse(savedStatus) });
    } else {
      axios.get(`/api/attendance/status?userId=${userId}`)
        .then(res => setAttendance(res.data))
        .catch(err => console.error("Failed to fetch attendance:", err));
    }
  }, [userId]);

  const handleCheckIn = () => {
    axios.post('/api/attendance/check-in', { userId })
      .then(() => {
        setAttendance({ checkedIn: true });
        localStorage.setItem(`attendance_${userId}`, true);
      })
      .catch(err => console.error("Check-in failed:", err));
  };

  const handleCheckOut = () => {
    axios.post('/api/attendance/check-out', { userId })
      .then(() => {
        setAttendance({ checkedIn: false });
        localStorage.setItem(`attendance_${userId}`, false);
      })
      .catch(err => console.error("Check-out failed:", err));
  };

  return (
    <Box sx={{ mt: 3, p: 2, border: '1px solid #ddd', borderRadius: 2, maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>Attendance</Typography>

      {attendance?.checkedIn ? (
        <>
          <Typography>You are currently checked in.</Typography>
          <Button variant="contained" color="error" onClick={handleCheckOut} sx={{ mt: 2 }}>
            Check Out
          </Button>
        </>
      ) : (
        <>
          <Typography>You are not checked in yet.</Typography>
          <Button variant="contained" color="success" onClick={handleCheckIn} sx={{ mt: 2 }}>
            Check In
          </Button>
        </>
      )}
    </Box>
  );
}
