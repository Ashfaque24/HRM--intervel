
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Sidebar from '../Components/Sidebar';

export default function AddRole() {
  const [roleName, setRoleName] = useState('');
  const [description, setDescription] = useState('');
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({ id: null, role_name: '', description: '' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  // Fetch roles on load
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admin/roles');
      if (res.data.success) setRoles(res.data.roles);
      else setError(res.data.Error || 'Failed to fetch roles');
    } catch {
      setError('Failed to fetch roles');
    }
  };

  const handleAddRole = async () => {
    if (!roleName.trim()) {
      setError('Role name is required');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3000/admin/add-role', {
        role_name: roleName,
        description: description,
      });
      if (res.data.success) {
        setSuccess('Role added successfully');
        setRoleName('');
        setDescription('');
        fetchRoles();
      } else {
        setError(res.data.Error || 'Failed to add role');
      }
    } catch {
      setError('Failed to add role');
    }
  };

  // FRONTEND ONLY DELETE
  const handleDeleteRole = () => {
    if (!roleToDelete) return;

    // Remove from the frontend list only
    setRoles(prevRoles => prevRoles.filter(role => role.id !== roleToDelete.id));

    setDeleteDialogOpen(false);
    setSuccess(`Role "${roleToDelete.role_name}" removed from list (not deleted from database)`);
  };

  const handleEditSave = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/admin/roles/${editData.id}`, {
        role_name: editData.role_name,
        description: editData.description,
      });
      if (res.data.success) {
        setRoles(roles.map(r => (r.id === editData.id ? { ...r, ...editData } : r)));
        setEditDialogOpen(false);
      } else {
        setError(res.data.Error || 'Failed to update role');
      }
    } catch {
      setError('Failed to update role');
    }
  };

  return (
    <Box sx={{ p: 3 }}> 
      <Typography variant="h5" gutterBottom>
        Add New Role
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          label="Role Name"
          fullWidth
          margin="normal"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleAddRole}
        >
          Add Role
        </Button>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Existing Roles
      </Typography>
      <List>
        {roles.map((role) => (
          <ListItem
            key={role.id}
            sx={{ borderBottom: '1px solid #ddd' }}
            secondaryAction={
              <>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setEditData({ id: role.id, role_name: role.role_name, description: role.description || '' });
                    setEditDialogOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => {
                    setRoleToDelete(role);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={role.role_name}
              secondary={role.description || 'No description'}
            />
          </ListItem>
        ))}
      </List>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            fullWidth
            margin="normal"
            value={editData.role_name}
            onChange={(e) => setEditData({ ...editData, role_name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Role</DialogTitle>
        <DialogContent>
          Are you sure you want to remove role "{roleToDelete?.role_name}" from the list? <br />
          <strong>This will not delete it from the database.</strong>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteRole}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


