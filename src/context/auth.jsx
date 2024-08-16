import { createContext, useEffect, useState } from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { getUser, login, register } from "../service/apiClient"
import ERR from "../service/errors.js"
import { validateEmail, validatePassword } from "../service/validation.js"
import Header from "../components/header/index.jsx"
import Navigation from "../components/navigation/index.jsx"
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [token, setToken] = useState(null)
    const [error, setError] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")

        if (storedToken) {
            setToken(storedToken);
            navigate(location?.pathname || "/")
        }
    }, [location?.pathname, navigate])

    useEffect(() => {
        async function getUserFromToken() {
            const { userId } = jwtDecode(token)
            const userDetails = await getUser(userId)

            if (userDetails.status === 'success') {
                setCurrentUser({ ...userDetails.data.user })
                return
            }

            setCurrentUser(null)
            return
        }

        if (token) {
            getUserFromToken()
        }
    }, [token])

    const useClickOutside = (ref, onClickOutside) => {
        useEffect(() => {
          const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
              onClickOutside()
            }
          }
    
          document.addEventListener("mousedown", handleClickOutside)
    
          return () => {
            document.removeEventListener("mousedown", handleClickOutside)
          }
        }, [ref, onClickOutside])
      }

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

            setError(ERR.LOGIN_FAILED)
            navigate("/login")
        } catch (error) {
            setError(error.message)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    const handleRegister = async (email, password, first_name, last_name) => {
        try {
            if (!email || !password || !first_name || !last_name) {
                throw new Error(ERR.REQUIRED_FIELDS_MISSING)
            }

            if (!validateEmail(email)) {
                throw new Error(ERR.EMAIL_ERROR_MESSAGE)
            }

            if (!validatePassword(password)) {
                throw new Error(ERR.PASSWORD_REQUIRMENTS)
            }

            const res = await register(email, password, first_name, last_name)

            if (res.data.error) {
                setError(res.data.error)

                return
            }

            localStorage.setItem("token", res.data.token)
            setToken(res.data.token)
            navigate("/")
        } catch (error) {
            setError(error.message)
        }
    }

    const value = {
        token,
        handleLogout,
        handleLogin,
        error,
        setError,
        handleRegister,
        currentUser,
        useClickOutside
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
            <Header />
            <Navigation />
            {children}
        </div>
    )
}

export { AuthContext, AuthProvider, ProtectedRoute }