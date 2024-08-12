import { useState } from "react"
import Form from "../../components/form/index.jsx"
import TextInput from "../../components/form/textInput/index.jsx"
import "./login.css"
import Button from "../../components/button/index.jsx"

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" })

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
                <div className="login-button-container">
                    <Button
                        text="Log in"
                        onClick={() => onLogin(formData.email, formData.password)}
                        classes="login-button"
                    />
                </div>
                <div className="need-account-container">
                    <p>Need an account?</p>
                    <Button
                        text="Register"
                        onClick={() => onLogin(formData.email, formData.password)}
                        classes="register-button"
                    />
                </div>
            </div>
        </div>
    )
  }
  
  export default Login