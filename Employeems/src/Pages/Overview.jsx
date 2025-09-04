// import React from "react";
// import {
//   Box,
//   Card,
//   Typography,
//   Avatar,
//   Divider,
//   Button,
//   Grid,
// } from "@mui/material";

// const Overview = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         gap: 2,
//         p: 2,
//         bgcolor: "#f4f7fa",
//         minHeight: "100vh",
//       }}
//     >
//       {/* LEFT: Profile Card */}
//       <Card
//         sx={{
//           width: 300,
//           borderRadius: 3,
//           p: 3,
//           boxShadow: 2,
//           bgcolor: "white",
//         }}
//       >
//         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//           <Avatar src="/profile.png" sx={{ width: 80, height: 80, mb: 1 }} />
//           <Typography variant="h6">ASHFAQ K</Typography>
//           <Typography variant="body2" color="text.secondary">
//           MERN Stack Developer Intern
//           </Typography>
//           <Typography variant="subtitle2" color="green" sx={{ mt: 1 }}>
//             Remote In
//           </Typography>
//           <Typography variant="h5" sx={{ my: 2 }}>
//             07 : 17 : 13
//           </Typography>
//           <Button variant="contained" color="error" size="small">
//             Check Out
//           </Button>
//         </Box>

//         <Divider sx={{ my: 2 }} />

//         <Box>
//           <Typography variant="body2">
//             <strong>Reporting To:</strong>
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             INTFE0215 - SHAHIDA P A
//           </Typography>
//           <Typography color="error" variant="body2">
//             Yet to check-in
//           </Typography>
//         </Box>
//       </Card>

//       {/* RIGHT: Good Morning + Work Schedule */}
//       <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}>
//         {/* Good Morning Card */}
//         <Card sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Box>
//             <Typography variant="h6">Good Afternoon ASHFAQ K</Typography>
//             <Typography color="text.secondary">Have a productive day!</Typography>
//           </Box>
//           <img src="/sun.png" alt="Sun" style={{ width: 60, height: 60 }} />
//         </Card>

//         {/* Work Schedule Card */}
//         <Card sx={{ p: 3 }}>
//           <Typography variant="h6">Work Schedule</Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//             31-Aug-2025 – 06-Sep-2025
//           </Typography>
//           <Box sx={{ bgcolor: "#eef6ff", p: 2, borderRadius: 2 }}>
//             <Typography variant="body2" sx={{ mb: 1 }}>
//               <strong>Technical</strong> <span style={{ color: "#1976d2" }}>10:00 AM – 7:00 PM</span>
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item>
//                 <Typography sx={{ color: "#888" }}>Sun 31</Typography>
//                 <Typography sx={{ fontSize: 12 }}>Weekend</Typography>
//               </Grid>
//               <Grid item>
//                 <Typography sx={{ color: "green" }}>Mon 01</Typography>
//                 <Typography sx={{ fontSize: 12, color: "green" }}>Remote In</Typography>
//               </Grid>
//               <Grid item>
//                 <Typography sx={{ color: "red" }}>Tue 02</Typography>
//                 <Typography sx={{ fontSize: 12, color: "red" }}>Absent</Typography>
//               </Grid>
//               <Grid item>
//                 <Typography sx={{ color: "green" }}>Wed 03</Typography>
//                 <Typography sx={{ fontSize: 12, color: "green" }}>Remote In</Typography>
//                 <Typography sx={{ fontSize: 12 }}>07:17 Hrs</Typography>
//               </Grid>
//               {/* Add more days here */}
//             </Grid>
//           </Box>
//         </Card>
//       </Box>
//     </Box>
//   );
// };

// export default Overview;

import React from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Divider,
  Button,
  Grid,
} from "@mui/material";

const Overview = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        bgcolor: "#f4f7fa",
        minHeight: "100vh",
      }}
    >
      {/* LEFT: Profile Card */}
      <Card
        sx={{
          width: 300,
          borderRadius: 3,
          p: 3,
          boxShadow: 2,
          bgcolor: "white",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Profile image from public/Images */}
          <Avatar src="/Images/profile.jpg" sx={{ width: 80, height: 80, mb: 1 }} />
          <Typography variant="h6">ASHFAQ K</Typography>
          <Typography variant="body2" color="text.secondary">
            MERN Stack Developer Intern
          </Typography>
          <Typography variant="subtitle2" color="green" sx={{ mt: 1 }}>
            Remote In
          </Typography>
          <Typography variant="h5" sx={{ my: 2 }}>
            07 : 17 : 13
          </Typography>
          <Button variant="contained" color="error" size="small">
            Check Out
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="body2">
            <strong>Reporting To:</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            INTFE0215 - SHAHIDA P A
          </Typography>
          <Typography color="error" variant="body2">
            Yet to check-in
          </Typography>
        </Box>
      </Card>

      {/* RIGHT: Good Morning + Work Schedule */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Good Morning Card */}
        <Card sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h6">Good Afternoon ASHFAQ K</Typography>
            <Typography color="text.secondary">Have a productive day!</Typography>
          </Box>
          {/* Sun image from public/Images */}
          <img src="/Images/leaf.png" alt="Sun" style={{ width: 60, height: 60 }} />
        </Card>

        {/* Work Schedule Card */}
        <Card sx={{ p: 3 }}>
          <Typography variant="h6">Work Schedule</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            31-Aug-2025 – 06-Sep-2025
          </Typography>
          <Box sx={{ bgcolor: "#eef6ff", p: 2, borderRadius: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Technical</strong>{" "}
              <span style={{ color: "#1976d2" }}>10:00 AM – 7:00 PM</span>
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Typography sx={{ color: "#888" }}>Sun 31</Typography>
                <Typography sx={{ fontSize: 12 }}>Weekend</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ color: "green" }}>Mon 01</Typography>
                <Typography sx={{ fontSize: 12, color: "green" }}>Remote In</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ color: "red" }}>Tue 02</Typography>
                <Typography sx={{ fontSize: 12, color: "red" }}>Absent</Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ color: "green" }}>Wed 03</Typography>
                <Typography sx={{ fontSize: 12, color: "green" }}>Remote In</Typography>
                <Typography sx={{ fontSize: 12 }}>07:17 Hrs</Typography>
              </Grid>
              {/* Add more days here */}
            </Grid>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default Overview;
