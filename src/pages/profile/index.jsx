import ProfileCard from "../../components/profileCard"
import useAuth from "../../hooks/useAuth"
import TextInput from "../../components/form/textInput"
import { useState } from "react"
import './profile.css'

const ProfilePage = () => {
    const { currentUser } = useAuth()
    const [formData, setFormData] = useState({
        email: currentUser.email,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name
    })

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({ 
            ...formData, 
            [name]: value 
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()


    }

    return (
      <>
        <main className="profile-main">
            <div className="profile-container">
                <ProfileCard disabled={true} />
                <h2>{currentUser.first_name} {currentUser.last_name}</h2>
            </div>

            <form className="profile-form-container" onSubmit={handleSubmit}>
                <TextInput
                    value={formData.email}
                    onChange={onChange}
                    name="email"
                    label={"Email *"}
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

                <div className="save-button-container">
                    <button>Save</button>
                </div>
            </form>

        </main>
      </>
    )
  }
  
  export default ProfilePage