
// import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import Login from './Components/Login'
// import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Dashboard from './Components/Dashboard'
// import Signup from './Components/Signup';
// function App() {
//   return (
//    <BrowserRouter>
//    <Routes>
//     <Route path='/' element={<Login />}></Route>
//     <Route path='/dashboard' element={<Dashboard />}></Route>
//     <Route path='/signup' element={<Signup />}></Route>
//    </Routes>
//    </BrowserRouter>
//   )
// }

// export default App
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Signup from './Components/Signup'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddRole from './Admin/AddRole'
import RoleManagement from './Admin/RoleManagment'
import AdminDashboard from './Admin/AdminDashbord'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/add-role' element={<AddRole />} />
        <Route path='/role-management' element={<RoleManagement />} />
        
        {/* Admin specific routes */}
        <Route path='/admin' element={< AdminDashboard/>} />
        <Route path='/manage-employees' element={<Dashboard />} /> {/* Replace with actual component */}
        <Route path='/category' element={<Dashboard />} /> {/* Replace with actual component */}
        <Route path='/profile' element={<Dashboard />} /> {/* Replace with actual component */}
        
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
