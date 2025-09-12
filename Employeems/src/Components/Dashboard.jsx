
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const drawerWidth = 80;

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* TOP NAVIGATION BAR */}
      <Navbar />

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
          mt: '64px', // height of navbar
          ml: `${drawerWidth}px`,
        }}
      >
        {/* Removed the headings as requested */}

        {/* Pages like Overview / Calendar will load here */}
        <Outlet />
      </Box>
    </Box>
  );
}

