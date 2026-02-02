import RoleSelection from "./pages/RoleSelect";
import Dashboard from "./pages/Dashboard";
import Request from "./pages/Request";
import Users from "./pages/Users";
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<RoleSelection />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Request' element={<Request />} />
        <Route path='/Users' element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
