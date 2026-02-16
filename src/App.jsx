import RoleSelection from "./pages/RoleSelect";
import Dashboard from "./pages/Dashboard";
import Request from "./pages/Request";
import Users from "./pages/Users";
import AppLayout from "./layouts/AppLayout";
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="bg-gray-900">
      <Routes>
        <Route path='/' element={<RoleSelection />} />

        <Route path='/dashboard' element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="requests" element={<Request />} />
          <Route path='users' element={<Users />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
