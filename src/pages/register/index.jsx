import { useState } from "react"
import Button from "../../components/button"
import Form from "../../components/form"
import TextInput from "../../components/form/textInput"
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import "./register.css"

const Register = () => {
    const { handleRegister, error } = useAuth()
    const [formData, setFormData] = useState({ 
        email: "", 
        password: "",
        first_name: "",
        last_name: "" 
    })
    const navigate = useNavigate()

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({ 
            ...formData, 
            [name]: value 
        })
    }

    return (
        <div className="login-register-container ">
            <div className="register-form-container">
                <div className="logo-container">
                    <img src="/../../src/assets/logo.png" alt="logo" className="logo"/>
                </div>

                <div className="register-form">
                    <h2>Register</h2>

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
                            <TextInput
                                value={formData.first_name}
                                onChange={onChange}
                                name="first_name"
                                label={"First name *"}
                            />
                            <TextInput
                                value={formData.last_name}
                                onChange={onChange}
                                name="last_name"
                                label={"Last name *"}
                            />
                    </Form>

                    <div className="error-message-container">
                        {error && <p className="error-message">{error}</p>}
                    </div>

                    <div className="login-button-container">
                        <Button
                            text="Register"
                            onClick={() => handleRegister(formData.email, formData.password, formData.first_name, formData.last_name)}
                            classes="login-button"
                        />
                    </div>

                    <div className="need-account-container">
                        <p>Already an account?</p>
                        <Button
                            text="Login"
                            onClick={() => navigate('/login')}
                            classes="register-button"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
  }
  
  export default Register