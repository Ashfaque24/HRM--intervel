import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Toolbar,
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 240;

const RoleManagement = () => {
    console.log('ethi')
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const menuItems = [
    { text: 'Dashboard', icon: <SpeedIcon />, path: '/dashboard' },
    { text: 'Manage Employees', icon: <PeopleIcon />, path: '/manage-employees' },
    { text: 'Role Management', icon: <AdminPanelSettingsIcon />, path: '/role-management' },
    { text: 'Add New Role', icon: <AddCircleIcon />, path: '/add-role' },
    { text: 'Category', icon: <CategoryIcon />, path: '/category' },
    { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
    { text: 'Logout', icon: <ExitToAppIcon />, path: '/logout' }
  ];

  // Fetch roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/auth/roles');
      if (response.data.success) {
        setRoles(response.data.roles);
      } else {
        setError('Failed to fetch roles');
      }
    } catch (err) {
      console.error('Error fetching roles:', err);
      setError('Failed to load roles');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/auth/roles/${roleToDelete.id}`);
      if (response.data.success) {
        setRoles(roles.filter(role => role.id !== roleToDelete.id));
        setDeleteDialogOpen(false);
        setRoleToDelete(null);
      } else {
        setError(response.data.Error || 'Failed to delete role');
      }
    } catch (err) {
      console.error('Error deleting role:', err);
      setError('Failed to delete role');
    }
  };

  const getRoleColor = (roleName) => {
    switch (roleName.toLowerCase()) {
      case 'admin': return 'error';
      case 'hr': return 'warning';
      case 'manager': return 'info';
      case 'employee': return 'default';
      default: return 'primary';
    }
  };

  const canDeleteRole = (role) => {
    // Don't allow deletion of default roles (Admin, HR, Manager, Employee)
    const protectedRoles = ['admin', 'hr', 'manager', 'employee'];
    return !protectedRoles.includes(role.role_name.toLowerCase());
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            INTERVAL - Role Management
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
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Role Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/add-role')}
          >
            Add New Role
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Role Name</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Loading roles...
                    </TableCell>
                  </TableRow>
                ) : roles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No roles found
                    </TableCell>
                  </TableRow>
                ) : (
                  roles.map((role) => (
                    <TableRow key={role.id} hover>
                      <TableCell>{role.id}</TableCell>
                      <TableCell>
                        <Chip 
                          label={role.role_name} 
                          color={getRoleColor(role.role_name)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{role.description || 'No description'}</TableCell>
                      <TableCell>
                        <Chip label="Active" color="success" size="small" />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton 
                          color="primary" 
                          size="small"
                          title="Edit Role"
                        >
                          <EditIcon />
                        </IconButton>
                        {canDeleteRole(role) && (
                          <IconButton 
                            color="error" 
                            size="small"
                            title="Delete Role"
                            onClick={() => {
                              setRoleToDelete(role);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete Role</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the role "{roleToDelete?.role_name}"? 
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteRole} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default RoleManagement;