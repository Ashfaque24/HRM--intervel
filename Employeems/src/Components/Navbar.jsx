
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
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/leave/summary")) setValue(0);
    else if (location.pathname.startsWith("/leave/balance")) setValue(1);
    else if (location.pathname.startsWith("/leave/requests")) setValue(2);
    else if (location.pathname.startsWith("/leave/holidays")) setValue(3);
    else if (location.pathname === "/goaloverview") setValue(0); // single Goal tab with value 0
    else if (location.pathname === "/dashboard/overview") setValue(0);
    else if (location.pathname === "/dashboard/calendar") setValue(1);
    else setValue(0);
  }, [location.pathname]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const isLeave = location.pathname.startsWith("/leave");
  const isGoalOverview = location.pathname === "/goaloverview";
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 2, bgcolor: "#243b6b" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
          {isLeave && (
            <Tabs
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab
                label="Leave Summary"
                value={0}
                onClick={() => navigate("/leave/summary")}
              />
              <Tab
                label="Leave Balance"
                value={1}
                onClick={() => navigate("/leave/balance")}
              />
              <Tab
                label="Leave Requests"
                value={2}
                onClick={() => navigate("/leave/requests")}
              />
              <Tab
                label="Holidays"
                value={3}
                onClick={() => navigate("/leave/holidays")}
              />
            </Tabs>
          )}
          {isGoalOverview && (
            <Tabs
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab
                label="Goal Overview"
                value={0}
                onClick={() => navigate("/goaloverview")}
              />
            </Tabs>
          )}
          {isDashboard && (
            <Tabs
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab
                label="Overview"
                value={0}
                onClick={() => navigate("/dashboard/overview")}
              />
              <Tab
                label="Calendar"
                value={1}
                onClick={() => navigate("/dashboard/calendar")}
              />
            </Tabs>
          )}
        </Box>
        <Box>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}


