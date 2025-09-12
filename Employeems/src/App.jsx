

// import React from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Login from './Components/Login';
// import Signup from './Components/Signup';
// import Dashboard from './Components/Dashboard';
// import AddRole from './Admin/AddRole';
// import RoleManagement from './Admin/RoleManagment';
// import AdminDashboard from './Admin/AdminDashbord';
// import Overview from './Pages/Overview';
// import Calendar from './Pages/Calendar';

// import LeaveTracker from './Components/LeaveTracker';
// import LeaveSummary from './Pages/LeaveSummary';
// import LeaveBalance from './Pages/LeaveBalance';
// import LeaveRequests from './Pages/LeaveRequests';
// import Holidays from './Pages/Holidays';
// import GoalOverview from './Pages/GoalOverview';
// import GoalManage from './Admin/GoalManage';

// import Navbar from './Components/Navbar';
// import Sidebar from './Components/Sidebar';

// function Layout({ children }) {
//   return (
//     <>
//       <Navbar />
//       <Sidebar />
//       <main style={{ marginLeft: 80, marginTop: 64, padding: 20 }}>
//         {children}
//       </main>
//     </>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Auth routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Dashboard routes with navbar and sidebar */}
//         <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} >
//           <Route path="overview" element={<Overview />} />
//           <Route path="calendar" element={<Calendar />} />
//         </Route>

//         {/* Goal overview and goal manage routes */}
//         <Route path="/goaloverview" element={<Layout><GoalOverview /></Layout>} />

//         {/* Leave Tracker routes */}
//         <Route path="/leave" element={<Layout><LeaveTracker /></Layout>} >
//           <Route path="summary" element={<LeaveSummary />} />
//           <Route path="balance" element={<LeaveBalance />} />
//           <Route path="requests" element={<LeaveRequests />} />
//           <Route path="holidays" element={<Holidays />} />
//         </Route>

//         {/* Admin routes */}
//         <Route path="/add-role" element={<Layout><AddRole /></Layout>} />
//         <Route path="/role-management" element={<Layout><RoleManagement /></Layout>} />
//         <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
//         <Route path="/goal-manage" element={<Layout><GoalManage /></Layout>} /> 

//         {/* Future routes */}
//         <Route path="/manage-employees" element={<Layout><Dashboard /></Layout>} />
//         <Route path="/category" element={<Layout><Dashboard /></Layout>} />
//         <Route path="/profile" element={<Layout><Dashboard /></Layout>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;



import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import AddRole from './Admin/AddRole';
import RoleManagement from './Admin/RoleManagment';
import AdminDashboard from './Admin/AdminDashbord';
import Overview from './Pages/Overview';
import Calendar from './Pages/Calendar';

import LeaveTracker from './Components/LeaveTracker';
import LeaveSummary from './Pages/LeaveSummary';
import LeaveBalance from './Pages/LeaveBalance';
import LeaveRequests from './Pages/LeaveRequests';
import Holidays from './Pages/Holidays';
import GoalOverview from './Pages/GoalOverview';
import GoalManage from './Admin/GoalManage';

import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: 80, marginTop: 64, padding: 20 }}>
        {children}
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard routes with navbar and sidebar */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} >
          <Route path="overview" element={<Overview />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>

        {/* Goal overview (user) route */}
        <Route path="/goaloverview" element={<Layout><GoalOverview /></Layout>} />

        {/* Leave Tracker routes */}
        <Route path="/leave" element={<Layout><LeaveTracker /></Layout>} >
          <Route path="summary" element={<LeaveSummary />} />
          <Route path="balance" element={<LeaveBalance />} />
          <Route path="requests" element={<LeaveRequests />} />
          <Route path="holidays" element={<Holidays />} />
        </Route>

        {/* Admin routes - Nested! */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="add-role" element={<AddRole />} />
          <Route path="role-management" element={<RoleManagement />} />
          <Route path="goal-manage" element={<GoalManage />} />
          {/* Add more admin routes below */}
        </Route>

        {/* Future or misc routes - unchanged */}
        <Route path="/manage-employees" element={<Layout><Dashboard /></Layout>} />
        <Route path="/category" element={<Layout><Dashboard /></Layout>} />
        <Route path="/profile" element={<Layout><Dashboard /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
