

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

const Signup = () => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post("http://localhost:3000/auth/signup", values);
      if (res.data.signupStatus) {
        setSuccess(res.data.message);
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(res.data.Error || "Signup failed");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%", borderRadius: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Typography variant="h5" align="center" gutterBottom>
          Create Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            fullWidth
            margin="normal"
            required
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <Button type="submit" fullWidth variant="contained" color="success" sx={{ mt: 2 }}>
            SIGN UP
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Signup;
