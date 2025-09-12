
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

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const result = await axios.post("http://localhost:3000/auth/login", values);

      if (result.data.loginStatus) {
        // Save JWT token and email in localStorage
        localStorage.setItem("authToken", result.data.token);
        localStorage.setItem("userEmail", result.data.email);

        const role = result.data.role;
        switch (role) {
          case "Admin":
            navigate("/admin");
            break;
          case "HR":
            navigate("/hr-dashboard");
            break;
          case "Manager":
            navigate("/manager-dashboard");
            break;
          default:
            navigate("/dashboard");
        }
      } else {
        setError(result.data.Error || "Invalid credentials");
      }
    } catch (err) {
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
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
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
            LOG IN
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
