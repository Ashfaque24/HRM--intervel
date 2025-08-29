import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Toolbar,
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Divider
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const drawerWidth = 240;

const AddRole = () => {
  const [roleData, setRoleData] = useState({ role_name: '', description: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const menuItems = [
    { text: 'Add New Role', icon: <AddCircleIcon />, path: '/add-role' },
    { text: 'Logout', icon: <ExitToAppIcon />, path: '/logout' }
  ];

  // Fetch existing roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/roles');
        if (response.data.success) {
          setRoles(response.data.roles);
        }
      } catch (err) {
        console.error("Failed to fetch roles:", err);
      } finally {
        setLoadingRoles(false);
      }
    };
    fetchRoles();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!roleData.role_name.trim()) {
      setError('Role name is required');
      setLoading(false);
      return;
    }

    try {
      const result = await axios.post('http://localhost:3000/admin/add-role', roleData);
      if (result.data.success) {
        setSuccess('Role added successfully!');
        setRoleData({ role_name: '', description: '' });
        // Refresh roles list after adding
        const updatedRoles = await axios.get('http://localhost:3000/admin/roles');
        if (updatedRoles.data.success) {
          setRoles(updatedRoles.data.roles);
        }
      } else {
        setError(result.data.Error || 'Failed to add role');
      }
    } catch (err) {
      console.error('Add role request failed:', err);
      setError(err.response?.data?.Error || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setRoleData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            INTERVAL - Add New Role
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
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
                  '&:hover': { backgroundColor: '#495057' }
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
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />

        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Add New Role
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Role Name"
              fullWidth
              required
              margin="normal"
              value={roleData.role_name}
              onChange={(e) => handleInputChange('role_name', e.target.value)}
              disabled={loading}
              placeholder="e.g., Project Manager, Senior Developer, Team Lead"
            />
            
            <TextField
              label="Role Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={roleData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              disabled={loading}
              placeholder="Describe the responsibilities..."
            />

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ minWidth: 120 }}
              >
                {loading ? 'Adding...' : 'Add Role'}
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() => setRoleData({ role_name: '', description: '' })}
                disabled={loading}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Existing Roles List */}
        <Paper elevation={2} sx={{ p: 3, maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            Existing Roles
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {loadingRoles ? (
            <Typography>Loading roles...</Typography>
          ) : roles.length === 0 ? (
            <Typography>No roles found.</Typography>
          ) : (
            roles.map(role => (
              <Box key={role.id} sx={{ mb: 1, p: 1, borderBottom: '1px solid #ddd' }}>
                <Typography variant="subtitle1">{role.role_name}</Typography>
                <Typography variant="body2" color="text.secondary">{role.description}</Typography>
              </Box>
            ))
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default AddRole;
