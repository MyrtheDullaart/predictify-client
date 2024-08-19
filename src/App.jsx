import './App.css'
import { AuthProvider, ProtectedRoute } from './context/auth'
import { Routes, Route } from "react-router-dom"
import Login from "./pages/login/index.jsx"
import Dashboard from './pages/dashboard/index.jsx'
import Register from './pages/register/index.jsx'
import { ModalProvider } from './context/modal.jsx'

function App() {
  return (
    <>
    <AuthProvider>
      <ModalProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        </Routes>
      </ModalProvider>
    </AuthProvider>
    </>
  )
}

export default App
