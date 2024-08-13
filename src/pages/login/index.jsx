import { useState } from "react"
import Form from "../../components/form/index.jsx"
import TextInput from "../../components/form/textInput/index.jsx"
import "./login.css"
import Button from "../../components/button/index.jsx"
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const { handleLogin, error } = useAuth()
    const [formData, setFormData] = useState({ email: "", password: "" })
    const navigate = useNavigate()

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({ 
            ...formData, 
            [name]: value 
        })
    }

    return (
        <div className="login-form-container">
            <div className="logo-container">
                <img src="/../../src/assets/logo.png" alt="logo" className="logo"/>
            </div>
            
            <div className="login-form">
                <h2>Login</h2>
                <Form>
                        <TextInput
                            value={formData.email}
                            onChange={onChange}
                            name="email"
                            label={"Email *"}
                        />
                        <TextInput
                            value={formData.password}
                            onChange={onChange}
                            name="password"
                            label={"Password *"}
                            type={"password"}
                        />
                </Form>

                <div className="error-message-container">
                    {error && <p className="error-message">{error}</p>}
                </div>

                <div className="login-button-container">
                    <Button
                        text="Log in"
                        onClick={() => handleLogin(formData.email, formData.password)}
                        classes="login-button"
                    />
                </div>

                <div className="need-account-container">
                    <p>Need an account?</p>
                    <Button
                        text="Register"
                        onClick={() => navigate('/register')}
                        classes="register-button"
                    />
                </div>
            </div>
        </div>
    )
  }
  
  export default Login