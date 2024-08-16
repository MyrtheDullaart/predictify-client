import './App.css'
import { AuthProvider, ProtectedRoute } from './context/auth'
import { Routes, Route } from "react-router-dom"
import Login from "./pages/login/index.jsx"
import Dashboard from './pages/dashboard/index.jsx'
import Register from './pages/register/index.jsx'

function App() {
  return (
    <>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App
