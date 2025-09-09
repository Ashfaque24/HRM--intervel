

import React, { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import HolidaysData from "../Data/HolidaysData";

export default function Holidays() {
  const [selectedYear, setSelectedYear] = useState(2025);

  const currentYearData = HolidaysData.find(
    (yearData) => yearData.year === selectedYear
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Top Section: Title + Year Selector */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Holiday Calendar - {selectedYear}
        </Typography>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Year"
          >
            {HolidaysData.map((data) => (
              <MenuItem key={data.year} value={data.year}>
                {data.year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Holiday List */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Holidays in {selectedYear}
        </Typography>
        <List>
          {currentYearData.holidays.map((holiday, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={holiday.holidayName}
                secondary={new Date(holiday.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
