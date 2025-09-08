

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

// New Leave Tracker imports
import LeaveTracker from './Components/LeaveTracker';
import LeaveSummary from './Pages/LeaveSummary';
import LeaveBalance from './Pages/LeaveBalance';
import LeaveRequests from './Pages/LeaveRequests';
import Holidays from './Pages/Holidays';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard routes (with Navbar + Sidebar) */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="overview" element={<Overview />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>

        {/* Leave Tracker routes */}
        <Route path="/leave" element={<LeaveTracker />}>
          <Route path="summary" element={<LeaveSummary />} />
          <Route path="balance" element={<LeaveBalance />} />
          <Route path="requests" element={<LeaveRequests />} />
          <Route path="holidays" element={<Holidays />} />
        </Route>

        {/* Admin routes */}
        <Route path="/add-role" element={<AddRole />} />
        <Route path="/role-management" element={<RoleManagement />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Future routes */}
        <Route path="/manage-employees" element={<Dashboard />} />
        <Route path="/category" element={<Dashboard />} />
        <Route path="/profile" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

