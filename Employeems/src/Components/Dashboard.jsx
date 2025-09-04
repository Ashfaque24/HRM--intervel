
import React, { useState } from 'react';
import { Box, CssBaseline, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AttendanceWidget from './AttendanceWidget';

const drawerWidth = 80;

export default function Dashboard() {
  const [userId] = useState(1);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* TOP NAVIGATION BAR */}
      <Navbar />

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px', // same height as Navbar
          ml: `${drawerWidth}px`
        }}
      >
        <Typography variant="h4" gutterBottom>
          Employee Dashboard
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          Welcome! Your attendance records will appear below:
        </Typography>

        <AttendanceWidget userId={userId} />
      </Box>
    </Box>
  );
}
