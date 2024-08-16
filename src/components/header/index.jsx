import { useRef, useState } from "react"
import ProfileCard from "../profileCard"
import "./header.css"
import useAuth from "../../hooks/useAuth"
import { NavLink } from "react-router-dom"

const Header = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const profileIconRef = useRef(null)
    const { useClickOutside, handleLogout } = useAuth()

    useClickOutside(profileIconRef, () => {
        setIsMenuVisible(false)
    })

    return (
        <header>
            <img src="../../src/assets/lightlogo.png" alt="Predictify logo light coloured" />
            <div ref={profileIconRef}>
                <ProfileCard name={`profile-card-header-container`} onClick={() => setIsMenuVisible(!isMenuVisible)}/>

                {isMenuVisible && 
                    <div className="profile-drop-down-container">
                        <ul className="profile-drop-down-ul">
                            <li>
                                <NavLink to={"/profile"}>
                                    <img src="../../src/assets/profile-icon.svg" alt="Profile icon" />
                                    <p>Profile</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/login"} onClick={handleLogout}>
                                    <img src="../../src/assets/logout-icon.svg" alt="Logout icon" />
                                    <p>Log out</p>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                }       
            </div>


        </header>
    )
}

export default Header