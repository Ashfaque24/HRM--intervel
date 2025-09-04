import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Calendar() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Calendar Page
      </Typography>
      <Typography variant="body1">
        Here you can display calendar events, schedules, and meetings 📅
      </Typography>
    </Box>
  );
}
