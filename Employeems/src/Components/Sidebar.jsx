// import React from 'react';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText
// } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import EventIcon from '@mui/icons-material/Event';
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
// import WorkIcon from '@mui/icons-material/Work';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import { useNavigate } from 'react-router-dom';

// const drawerWidth = 80;

// const menuItems = [
//   { text: 'Home', icon: <HomeIcon />, path: '/' },
//   { text: 'CRM', icon: <AssessmentIcon />, path: '/crm' },
//   { text: 'Performance', icon: <DashboardIcon />, path: '/performance' },
//   { text: 'Leave', icon: <EventIcon />, path: '/leave' },
//   { text: 'Attendance', icon: <AssignmentTurnedInIcon />, path: '/attendance' },
//   { text: 'Tasks', icon: <WorkIcon />, path: '/tasks' },
//   { text: 'Files', icon: <FileCopyIcon />, path: '/files' },
//   { text: 'More', icon: <MoreHorizIcon />, path: '/more' },
//   { text: 'Reports', icon: <CheckCircleOutlineIcon />, path: '/reports' },
// ];

// export default function Sidebar() {
//   const navigate = useNavigate();

//   return (
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//           backgroundColor: '#1a2a4f',
//           color: '#fff',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           paddingTop: 2
//         }
//       }}
//       variant="permanent"
//       anchor="left"
//     >
//       <List>
//         {menuItems.map((item) => (
//           <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
//             <ListItemButton
//               onClick={() => navigate(item.path)}
//               sx={{
//                 flexDirection: 'column',
//                 textAlign: 'center',
//                 minHeight: 70,
//                 color: '#fff'
//               }}
//             >
//               <ListItemIcon sx={{ justifyContent: 'center', color: '#fff' }}>
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText
//                 primary={item.text}
//                 primaryTypographyProps={{ fontSize: 12 }}
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// }

// export { drawerWidth };

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WorkIcon from '@mui/icons-material/Work';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 80;

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'CRM', icon: <AssessmentIcon />, path: '/crm' },
  { text: 'Performance', icon: <DashboardIcon />, path: '/performance' },
  { text: 'Leave', icon: <EventIcon />, path: '/leave' },
  { text: 'Attendance', icon: <AssignmentTurnedInIcon />, path: '/attendance' },
  { text: 'Tasks', icon: <WorkIcon />, path: '/tasks' },
  { text: 'Files', icon: <FileCopyIcon />, path: '/files' },
  { text: 'More', icon: <MoreHorizIcon />, path: '/more' },
  { text: 'Reports', icon: <CheckCircleOutlineIcon />, path: '/reports' },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1a2a4f',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 2,
          top: '64px' // Push below navbar
        }
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                flexDirection: 'column',
                textAlign: 'center',
                minHeight: 70,
                color: '#fff'
              }}
            >
              <ListItemIcon sx={{ justifyContent: 'center', color: '#fff' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontSize: 12 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
