
// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Tabs,
//   Tab,
//   Box,
//   IconButton,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [value, setValue] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Highlight the correct tab based on the current URL
//   useEffect(() => {
//     if (location.pathname.startsWith("/leave/summary")) setValue(0);
//     else if (location.pathname.startsWith("/leave/balance")) setValue(1);
//     else if (location.pathname.startsWith("/leave/requests")) setValue(2);
//     else if (location.pathname.startsWith("/leave/holidays")) setValue(3);
//     else if (location.pathname === "/dashboard/overview") setValue(0);
//     else if (location.pathname === "/dashboard/calendar") setValue(1);
//     else setValue(false);
//   }, [location.pathname]);

//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   const handleLogout = () => {
//     handleMenuClose();
//     localStorage.removeItem("userEmail");
//     navigate("/"); // back to login
//   };

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: (theme) => theme.zIndex.drawer + 2,
//         bgcolor: "#243b6b",
//       }}
//     >
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//         {/* Left side: Logo + Tabs */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <img
//             src="/Images/leaf.png"
//             alt="Logo"
//             style={{
//               height: "32px",
//               width: "32px",
//               borderRadius: "50%",
//               objectFit: "contain",
//               marginRight: "16px",
//             }}
//           />

//           {/* Controlled Tabs */}
//           <Tabs
//             value={value}
//             onChange={(e, newValue) => setValue(newValue)}
//             textColor="inherit"
//             indicatorColor="secondary"
//           >
//             {location.pathname.startsWith("/leave") ? (
//               <>
//                 <Tab
//                   label="Leave Summary"
//                   onClick={() => navigate("/leave/summary")}
//                 />
//                 <Tab
//                   label="Leave Balance"
//                   onClick={() => navigate("/leave/balance")}
//                 />
//                 <Tab
//                   label="Leave Requests"
//                   onClick={() => navigate("/leave/requests")}
//                 />
//                 <Tab
//                   label="Holidays"
//                   onClick={() => navigate("/leave/holidays")}
//                 />
//               </>
//             ) : (
//               <>
//                 <Tab
//                   label="Overview"
//                   onClick={() => navigate("/dashboard/overview")}
//                 />
//                 <Tab
//                   label="Calendar"
//                   onClick={() => navigate("/dashboard/calendar")}
//                 />
//               </>
//             )}
//           </Tabs>
//         </Box>

//         {/* Right side: Profile Icon */}
//         <Box>
//           <IconButton color="inherit" onClick={handleMenuOpen}>
//             <AccountCircleIcon fontSize="large" />
//           </IconButton>

//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }


import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(0); // Default to 0 instead of false
  const navigate = useNavigate();
  const location = useLocation();

  // Highlight the correct tab based on the current URL
  useEffect(() => {
    if (location.pathname.startsWith("/leave/summary")) setValue(0);
    else if (location.pathname.startsWith("/leave/balance")) setValue(1);
    else if (location.pathname.startsWith("/leave/requests")) setValue(2);
    else if (location.pathname.startsWith("/leave/holidays")) setValue(3);
    else if (location.pathname === "/dashboard/overview") setValue(0);
    else if (location.pathname === "/dashboard/calendar") setValue(1);
    else setValue(0); // fallback to 0
  }, [location.pathname]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("userEmail");
    navigate("/"); // back to login
  };

  const isLeave = location.pathname.startsWith("/leave");

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        bgcolor: "#243b6b",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: Logo + Tabs */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/Images/leaf.png"
            alt="Logo"
            style={{
              height: "32px",
              width: "32px",
              borderRadius: "50%",
              objectFit: "contain",
              marginRight: "16px",
            }}
          />

          <Tabs
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            textColor="inherit"
            indicatorColor="secondary"
          >
            {isLeave
              ? [
                  <Tab
                    key={0}
                    label="Leave Summary"
                    value={0}
                    onClick={() => navigate("/leave/summary")}
                  />,
                  <Tab
                    key={1}
                    label="Leave Balance"
                    value={1}
                    onClick={() => navigate("/leave/balance")}
                  />,
                  <Tab
                    key={2}
                    label="Leave Requests"
                    value={2}
                    onClick={() => navigate("/leave/requests")}
                  />,
                  <Tab
                    key={3}
                    label="Holidays"
                    value={3}
                    onClick={() => navigate("/leave/holidays")}
                  />,
                ]
              : [
                  <Tab
                    key={0}
                    label="Overview"
                    value={0}
                    onClick={() => navigate("/dashboard/overview")}
                  />,
                  <Tab
                    key={1}
                    label="Calendar"
                    value={1}
                    onClick={() => navigate("/dashboard/calendar")}
                  />,
                ]}
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
