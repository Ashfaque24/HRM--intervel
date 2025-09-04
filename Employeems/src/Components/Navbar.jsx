
// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Tabs,
//   Tab,
//   Box,
//   IconButton,
//   Menu,
//   MenuItem
// } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// export default function Navbar() {
//   const [anchorEl, setAnchorEl] = useState(null);

//   // Open menu
//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   // Close menu
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     handleMenuClose();
//     // 👉 Add your logout logic here
//     console.log('User logged out');
//   };

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: (theme) => theme.zIndex.drawer + 1,
//         bgcolor: '#243b6b'
//       }}
//     >
//       <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         {/* Left side: Logo + Tabs */}
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <img
//             src="/Images/leaf.png"
//             alt="Logo"
//             style={{
//               height: '32px',
//               width: '32px',
//               borderRadius: '50%',
//               objectFit: 'contain',
//               marginRight: '16px'
//             }}
//           />

//           <Tabs textColor="inherit" indicatorColor="secondary">
//             <Tab label="My Space" />
//             <Tab label="Team" />
//             <Tab label="Organization" />
//           </Tabs>
//         </Box>

//         {/* Right side: Profile Icon */}
//         <Box>
//           <IconButton color="inherit" onClick={handleMenuOpen}>
//             <AccountCircleIcon fontSize="large" />
//           </IconButton>

//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//           >
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();

    // Clear session data
    localStorage.removeItem('userEmail');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: '#243b6b'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left side: Logo + Tabs */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/Images/leaf.png"
            alt="Logo"
            style={{
              height: '32px',
              width: '32px',
              borderRadius: '50%',
              objectFit: 'contain',
              marginRight: '16px'
            }}
          />

          {/* New Tabs */}
          <Tabs textColor="inherit" indicatorColor="secondary">
            <Tab label="Overview" onClick={() => navigate('/overview')} />
            <Tab label="Calendar" onClick={() => navigate('/calendar')} />
          </Tabs>
        </Box>

        {/* Right side: Profile Icon */}
        <Box>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}


