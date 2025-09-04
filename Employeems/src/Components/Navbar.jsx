
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
  const [value, setValue] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Highlight tab based on current URL
  useEffect(() => {
    if (location.pathname === "/dashboard/overview") setValue(0);
    else if (location.pathname === "/dashboard/calendar") setValue(1);
    else setValue(false);
  }, [location.pathname]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    localStorage.removeItem("userEmail");
    navigate("/"); // back to login
  };

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

          {/* Controlled Tabs */}
          <Tabs
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Overview" onClick={() => navigate("/dashboard/overview")} />
            <Tab label="Calendar" onClick={() => navigate("/dashboard/calendar")} />
          </Tabs>
        </Box>

        {/* Right side: Profile Icon */}
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
