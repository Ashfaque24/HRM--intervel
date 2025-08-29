
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Box, Drawer, List, ListItem, ListItemIcon, ListItemText,
//   Typography, Toolbar, AppBar, CssBaseline, Button
// } from '@mui/material';
// import axios from 'axios';
// import SpeedIcon from '@mui/icons-material/Speed';
// import PeopleIcon from '@mui/icons-material/People';
// import CategoryIcon from '@mui/icons-material/Category';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// const drawerWidth = 240;

// const Dashboard = () => {
//   const userRole = localStorage.getItem('userRole');
//   const userEmail = localStorage.getItem('userEmail'); // Make sure this is stored during login

//   const [checkedIn, setCheckedIn] = useState(false);
//   const [secondsWorked, setSecondsWorked] = useState(0);
//   const [timer, setTimer] = useState(null);
//   const [errorMessage, setErrorMessage] = useState('');

//   // Start/stop timer based on check-in state
//   useEffect(() => {
//     if (checkedIn) {
//       const interval = setInterval(() => {
//         setSecondsWorked(prev => prev + 1);
//       }, 1000);
//       setTimer(interval);
//     } else if (timer) {
//       clearInterval(timer);
//     }
//     return () => clearInterval(timer);
//   }, [checkedIn]);

//   const handleCheckIn = async () => {
//     if (!userEmail) {
//       setErrorMessage('Email not found. Please log in again.');
//       return;
//     }
//     try {
//       const result = await axios.post("http://localhost:3000/api/attendance/check-in", { email: userEmail });
//       if (result.data.success) {
//         setCheckedIn(true);
//         setSecondsWorked(0);
//         setErrorMessage('');
//       } else {
//         setErrorMessage(result.data.message || 'Unable to check in.');
//       }
//     } catch (error) {
//       console.error("Check-in failed", error);
//       setErrorMessage(error.response?.data?.error || 'Server error during check-in.');
//     }
//   };

//   const handleCheckOut = async () => {
//     if (!userEmail) {
//       setErrorMessage('Email not found. Please log in again.');
//       return;
//     }
//     try {
//       const result = await axios.post("http://localhost:3000/api/attendance/check-out", { email: userEmail });
//       if (result.data.success) {
//         setCheckedIn(false);
//         setErrorMessage('');
//       } else {
//         setErrorMessage(result.data.message || 'Unable to check out.');
//       }
//     } catch (error) {
//       console.error("Check-out failed", error);
//       setErrorMessage(error.response?.data?.error || 'Server error during check-out.');
//     }
//   };

//   const formatTime = (secs) => {
//     const h = Math.floor(secs / 3600);
//     const m = Math.floor((secs % 3600) / 60);
//     const s = secs % 60;
//     return `${h}h ${m}m ${s}s`;
//   };

//   const menuItems = userRole === 'admin'
//     ? [
//         { text: 'Dashboard', icon: <SpeedIcon />, path: '/dashboard' },
//         { text: 'Manage Employees', icon: <PeopleIcon />, path: '/manage-employees' },
//         { text: 'Category', icon: <CategoryIcon />, path: '/category' },
//         { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
//         { text: 'Logout', icon: <ExitToAppIcon />, path: '/logout' }
//       ]
//     : [
//         { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
//         { text: 'Logout', icon: <ExitToAppIcon />, path: '/logout' }
//       ];

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             INTERVAL
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//             backgroundColor: '#212529',
//             color: '#fff',
//           },
//         }}
//       >
//         <Toolbar />
//         <Box sx={{ overflow: 'auto' }}>
//           <List>
//             {menuItems.map((item) => (
//               <ListItem
//                 key={item.text}
//                 button
//                 component={Link}
//                 to={item.path}
//               >
//                 <ListItemIcon sx={{ color: '#fff' }}>
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>

//       <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
//         <Toolbar />
//         <Typography variant="h4" gutterBottom>
//           Welcome to the Dashboard
//         </Typography>

//         {errorMessage && (
//           <Typography variant="body2" color="error" sx={{ mt: 2 }}>
//             {errorMessage}
//           </Typography>
//         )}

//         <Box sx={{ mt: 3 }}>
//           <Typography variant="h6">
//             {checkedIn ? "You are checked in" : "You are not checked in"}
//           </Typography>
//           <Typography variant="body1" sx={{ mt: 1 }}>
//             Worked Time: {formatTime(secondsWorked)}
//           </Typography>

//           {checkedIn ? (
//             <Button variant="contained" color="error" onClick={handleCheckOut} sx={{ mt: 2 }}>
//               Check Out
//             </Button>
//           ) : (
//             <Button variant="contained" color="primary" onClick={handleCheckIn} sx={{ mt: 2 }}>
//               Check In
//             </Button>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Drawer, List, ListItem, ListItemIcon, ListItemText,
  Typography, Toolbar, AppBar, CssBaseline, Button
} from '@mui/material';
import axios from 'axios';
import SpeedIcon from '@mui/icons-material/Speed';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 240;

const Dashboard = () => {
  const userRole = localStorage.getItem('userRole');
  const userEmail = localStorage.getItem('userEmail'); // stored during login

  const [checkedIn, setCheckedIn] = useState(false);
  const [secondsWorked, setSecondsWorked] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Start/stop timer based on check-in state
  useEffect(() => {
    if (checkedIn) {
      const id = setInterval(() => {
        setSecondsWorked(prev => prev + 1);
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [checkedIn]);

  const handleCheckIn = async () => {
    if (!userEmail) {
      setErrorMessage('Email not found. Please log in again.');
      return;
    }
    try {
      const result = await axios.post("http://localhost:3000/api/attendance/check-in", { email: userEmail });
      if (result.data.success) {
        setCheckedIn(true);
        // Resume timer from saved total_duration (sent by backend)
        setSecondsWorked(result.data.total_duration || 0);
        setErrorMessage('');
      } else {
        setErrorMessage(result.data.message || 'Unable to check in.');
      }
    } catch (error) {
      console.error("Check-in failed", error);
      setErrorMessage(error.response?.data?.error || 'Server error during check-in.');
    }
  };

  const handleCheckOut = async () => {
    if (!userEmail) {
      setErrorMessage('Email not found. Please log in again.');
      return;
    }
    try {
      const result = await axios.post("http://localhost:3000/api/attendance/check-out", { email: userEmail });
      if (result.data.success) {
        setCheckedIn(false);
        // Update worked seconds with total_duration returned from backend
        setSecondsWorked(result.data.total_duration || secondsWorked);
        setErrorMessage('');
      } else {
        setErrorMessage(result.data.message || 'Unable to check out.');
      }
    } catch (error) {
      console.error("Check-out failed", error);
      setErrorMessage(error.response?.data?.error || 'Server error during check-out.');
    }
  };

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h}h ${m}m ${s}s`;
  };

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

        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">
            {checkedIn ? "You are checked in" : "You are not checked in"}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Worked Time: {formatTime(secondsWorked)}
          </Typography>

          {checkedIn ? (
            <Button variant="contained" color="error" onClick={handleCheckOut} sx={{ mt: 2 }}>
              Check Out
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleCheckIn} sx={{ mt: 2 }}>
              Check In
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
