import { createContext, useEffect, useState } from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { login } from "../service/apiClient"
import ERR from "../service/errors.js"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")

    if (storedToken) {
      setToken(storedToken);
      navigate(location?.pathname || "/")
    }
  }, [location?.pathname, navigate])

  const handleLogin = async (email, password) => {
    try {
        if (!email || !password) {
            throw new Error(ERR.ENTER_EMAIL_PASSWORD)
        }

        const res = await login(email, password)

        if (res.data.error) {
            setError(res.data.error)

            return
        }

        if (res.data.token) {
            localStorage.setItem("token", res.data.token)
            setToken(res.data.token)
            navigate(location.state?.from?.pathname || "/")
            setError(null)

            return
        }
        setUser({ ...res.data.user })
        setError(ERR.LOGIN_FAILED)

        navigate("/login")
    } catch (error) {
        setError(error.message)
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
    handleLogin,
    error,
    setError
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