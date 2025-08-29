import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Add Link here
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post('http://localhost:3000/auth/login', values);

      console.log("Server response:", result.data);

      if (result.data.loginStatus === true) {
        console.log(result.data)
        localStorage.setItem('userEmail',result.data.email)
  const userRole = result.data.role;
  if (userRole === 'Admin') {
    navigate('/admin');
  } else if (userRole === 'HR') {
    navigate('/hr-dashboard');
  } else if (userRole === 'Manager') {
    navigate('/manager-dashboard');
  } else {
    navigate('/dashboard'); // Employee
  }
}
 else {
        setError(result.data.Error || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: '100%', borderRadius: 2 }}>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        <Typography variant="h5" align="center" gutterBottom>
          Login Page
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            variant="outlined"
            margin="normal"
            autoComplete="off"
            required
            onChange={(e) =>
              setValues({ ...values, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            variant="outlined"
            margin="normal"
            required
            onChange={(e) =>
              setValues({ ...values, password: e.target.value })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ marginTop: 2 }}
          >
            LOG IN
          </Button>
        </Box>

        {/* Sign-up Link */}
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: 2 }}
        >
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
