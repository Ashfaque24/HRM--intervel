import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Toolbar, 
  AppBar, 
  CssBaseline 
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const drawerWidth = 240;

const Dashboard = () => {
  const location = useLocation();

  const menuItems = [
    // { text: 'Dashboard', icon: <SpeedIcon />, path: '/dashboard' },
    { text: 'Add New Role', icon: <AddCircleIcon />, path: '/add-role' },
    // { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
    { text: 'Logout', icon: <ExitToAppIcon />, path: '/logout' }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* AppBar (Top Bar) */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            INTERVAL - Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#212529',
            color: '#fff',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                button
                component={Link}
                to={item.path}
                sx={{
                  backgroundColor: location.pathname === item.path ? '#495057' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#495057',
                  }
                }}
              >
                <ListItemIcon sx={{ color: '#fff' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Welcome to the Admin Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Employee Management System
        </Typography>
        
        {/* Dashboard Stats Cards */}
        <Box sx={{ display: 'flex', gap: 2, mt: 4, flexWrap: 'wrap' }}>
          <Box sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            p: 3, 
            borderRadius: 2, 
            minWidth: 200,
            flexGrow: 1
          }}>
            <Typography variant="h6">Total Employees</Typography>
            <Typography variant="h4">0</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
