// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Paper,
//   Alert,
// } from '@mui/material';

// const Signup = () => {
//   const [values, setValues] = useState({
//     name: '',
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();
//   axios.defaults.withCredentials = true; // Keep if backend supports cookies

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const result = await axios.post('http://localhost:3000/auth/signup', values);

//       console.log("Signup response:", result.data);

//       if (result.data.signupStatus === true || result.data.signupStatus === 'true') {
//         setSuccess("Signup successful! Redirecting to login...");
//         setTimeout(() => navigate('/'), 1500);
//       } else {
//         setError(result.data.Error || "Signup failed, please try again.");
//       }
//     } catch (err) {
//       console.error("Signup request failed:", err);
//       setError("Server error. Please try again.");
//     }
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//       }}
//     >
//       <Paper elevation={3} sx={{ padding: 4, width: '100%', borderRadius: 2 }}>
//         {error && (
//           <Alert severity="error" sx={{ marginBottom: 2 }}>
//             {error}
//           </Alert>
//         )}
//         {success && (
//           <Alert severity="success" sx={{ marginBottom: 2 }}>
//             {success}
//           </Alert>
//         )}
//         <Typography variant="h5" align="center" gutterBottom>
//           Signup Page
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit}>
//           <TextField
//             label="Name"
//             type="text"
//             name="name"
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             required
//             onChange={(e) => setValues({ ...values, name: e.target.value })}
//           />
//           <TextField
//             label="Email"
//             type="email"
//             name="email"
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             required
//             onChange={(e) => setValues({ ...values, email: e.target.value })}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             name="password"
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             required
//             onChange={(e) => setValues({ ...values, password: e.target.value })}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="success"
//             sx={{ marginTop: 2 }}
//           >
//             SIGN UP
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await axios.post('http://localhost:3000/auth/signup', values);
      
      console.log("Signup response:", result.data);
      
      if (result.data.signupStatus === true || result.data.signupStatus === 'true') {
        const successMessage = result.data.isFirstUser 
          ? "Admin account created successfully! You are now the system administrator. Redirecting to login..."
          : "User account created successfully! Redirecting to login...";
        
        setSuccess(successMessage);
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(result.data.Error || "Signup failed, please try again.");
      }
    } catch (err) {
      console.error("Signup request failed:", err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
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
        {success && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            {success}
          </Alert>
        )}
        <Typography variant="h5" align="center" gutterBottom>
          Create Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            name="name"
            fullWidth
            variant="outlined"
            margin="normal"
            required
            disabled={loading}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            variant="outlined"
            margin="normal"
            required
            disabled={loading}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            variant="outlined"
            margin="normal"
            required
            disabled={loading}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ marginTop: 2 }}
            disabled={loading}
          >
            {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
          </Button>
        </Box>
        
        {/* Login Link */}
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: 2 }}
        >
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Signup;
