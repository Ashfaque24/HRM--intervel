// LeaveTracker.jsx
import React from 'react';
import { Box, CssBaseline, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

const drawerWidth = 80;

export default function LeaveTracker() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* TOP NAVIGATION BAR */}
      <Navbar section="leave" />

      {/* LEFT SIDEBAR */}
      <Box
        component="nav"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: (theme) => theme.zIndex.appBar - 1,
        }}
      >
        <Sidebar />
      </Box>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px', // Navbar height
          ml: `${drawerWidth}px`,
        }}
      >
        <Typography variant="h4" gutterBottom>
          
        </Typography>

        {/* Subpages will load here */}
        <Outlet />
      </Box>
    </Box>
  );
}
