

import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FlagIcon from '@mui/icons-material/Flag';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 240;

const menuItems = [
  { text: 'Add New Role', icon: <AddCircleIcon />, path: '/admin/add-role' },
  { text: 'Goal Manage', icon: <FlagIcon />, path: '/admin/goal-manage' },
  { text: 'Logout', icon: <ExitToAppIcon />, path: '/logout' }
];

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            INTERVAL - Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

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
                component={Link}
                to={item.path}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: location.pathname === item.path ? '#495057' : 'transparent',
                  '&:hover': { backgroundColor: '#495057' },
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

      {/* Main Content - renders child admin routes via Outlet */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Outlet /> {/* Nested admin routes will render here */}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
