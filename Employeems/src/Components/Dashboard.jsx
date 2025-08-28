
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Toolbar, AppBar, CssBaseline } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 240;

const Dashboard = () => {
  const userRole = localStorage.getItem('userRole'); // fetch role

  // Dynamic menu items based on role
  const menuItems = userRole === 'admin'
    ? [
        { text: 'Dashboard', icon: <SpeedIcon />, path: '/dashboard' },
        { text: 'Manage Employees', icon: <PeopleIcon />, path: '/manage-employees' },
        { text: 'Category', icon: <CategoryIcon />, path: '/category' },
        { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
        { text: 'Logout', icon: <ExitToAppIcon />, path: '/logout' }
      ]
    : [
        { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
        { text: 'Logout', icon: <ExitToAppIcon />, path: '/logout' }
      ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            INTERVAL
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
                button
                component={Link}
                to={item.path}
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

      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;

