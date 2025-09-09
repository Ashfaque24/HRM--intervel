

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import HolidaysData from "../Data/HolidaysData";

// export default function Holidays() {
//   const [selectedYear, setSelectedYear] = useState(2025);

//   const currentYearData = HolidaysData.find(
//     (yearData) => yearData.year === selectedYear
//   );

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Top Section: Title + Year Selector */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//         <Typography variant="h5" fontWeight="bold">
//           Holiday Calendar - {selectedYear}
//         </Typography>

//         <FormControl size="small" sx={{ minWidth: 150 }}>
//           <InputLabel>Year</InputLabel>
//           <Select
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             label="Year"
//           >
//             {HolidaysData.map((data) => (
//               <MenuItem key={data.year} value={data.year}>
//                 {data.year}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Holiday List */}
//       <Paper sx={{ p: 2 }}>
//         <Typography variant="h6" gutterBottom>
//           Holidays in {selectedYear}
//         </Typography>
//         <List>
//           {currentYearData.holidays.map((holiday, index) => (
//             <ListItem key={index} divider>
//               <ListItemText
//                 primary={holiday.holidayName}
//                 secondary={new Date(holiday.date).toLocaleDateString("en-IN", {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 })}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Paper>
//     </Box>
//   );
// }
import React, { useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import HolidaysData from "../Data/HolidaysData";

export default function Holidays() {
  const [selectedYear, setSelectedYear] = useState(2025);

  const currentYearData = HolidaysData.find(
    (yearData) => yearData.year === selectedYear
  );

  // Columns using renderCell instead of valueGetter
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "holidayName", headerName: "Name", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => (
        <>
          {new Date(params.value).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            weekday: "short",
          })}
        </>
      ),
    },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "shifts", headerName: "Shifts", flex: 1 },
    { field: "classification", headerName: "Classification", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
  ];

  // Rows
  const rows =
    currentYearData?.holidays.map((holiday, index) => ({
      id: index + 1,
      holidayName: holiday.holidayName,
      date: holiday.date,
      location: holiday.location || "All Locations",
      shifts: holiday.shifts || "All Shifts",
      classification: holiday.classification || "Holiday",
      description: holiday.description || holiday.holidayName,
    })) || [];

  return (
    <Box sx={{ p: 3 }}>
      {/* Top Section: Title + Year Selector */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
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

      {/* DataGrid */}
      <Paper sx={{ height: 500, width: "100%", p: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 20, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}
