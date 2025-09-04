

// import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import Login from './Components/Login'
// import Dashboard from './Components/Dashboard'
// import Signup from './Components/Signup'

// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import AddRole from './Admin/AddRole'
// import RoleManagement from './Admin/RoleManagment'
// import AdminDashboard from './Admin/AdminDashbord'
// import Overview from './Pages/Overview'
// import Calendar from './Pages/Calendar'

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Login />} />
//         <Route path='/dashboard' element={<Dashboard />} />
//         <Route path='/signup' element={<Signup />} />
//         <Route path='/add-role' element={<AddRole />} />
//         <Route path='/role-management' element={<RoleManagement />} />

//         {/* Admin specific routes */}
//         <Route path='/admin' element={<AdminDashboard />} />
//         <Route path='/manage-employees' element={<Dashboard />} /> {/* Replace with actual component */}
//         <Route path='/category' element={<Dashboard />} /> {/* Replace with actual component */}
//         <Route path='/profile' element={<Dashboard />} /> {/* Replace with actual component */}

//         {/* New pages */}
//         <Route path='/overview' element={<Overview />} />
//         <Route path='/calendar' element={<Calendar />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Signup from './Components/Signup';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddRole from './Admin/AddRole';
import RoleManagement from './Admin/RoleManagment';
import AdminDashboard from './Admin/AdminDashbord';
import Overview from './Pages/Overview';
import Calendar from './Pages/Calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard routes (always show Navbar + Sidebar) */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="overview" element={<Overview />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>

        {/* Admin specific routes */}
        <Route path="/add-role" element={<AddRole />} />
        <Route path="/role-management" element={<RoleManagement />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manage-employees" element={<Dashboard />} /> {/* Replace later */}
        <Route path="/category" element={<Dashboard />} /> {/* Replace later */}
        <Route path="/profile" element={<Dashboard />} /> {/* Replace later */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
