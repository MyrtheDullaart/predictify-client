import { createContext, useEffect, useState } from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { login } from "../service/apiClient"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")

    if (storedToken) {
      setToken(storedToken);
      navigate(location?.pathname || "/")
    }
  }, [location?.pathname, navigate])

  const handleLogin = async (email, password) => {
    try {
        const res = await login(email, password)


        if (res.data.token) {
            localStorage.setItem("token", res.data.token)
            setToken(res.data.token)
            navigate(location.state?.from?.pathname || "/")

            return
        }
        setUser({ ...res.data.user })

        navigate("/login")
    } catch (error) {
        console.log(error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  const value = {
    token,
    user,
    handleLogout,
    handleLogin
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return (
    <div className="container">
      {children}
    </div>
  )
}

export { AuthContext, AuthProvider, ProtectedRoute }