import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Overview() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Overview Page
      </Typography>
      <Typography variant="body1">
        Welcome to the Overview! 🚀 You can display summary information here.
      </Typography>
    </Box>
  );
}
