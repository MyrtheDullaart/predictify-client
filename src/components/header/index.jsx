import { useRef, useState } from "react"
import ProfileCard from "../profileCard"
import "./header.css"
import useAuth from "../../hooks/useAuth"
import { NavLink } from "react-router-dom"
import lightLogo from "../../assets/lightlogo.png"
import logoutIcon from "../../assets/logout-icon.svg"
import profileIcon from "../../assets/dark-profile-icon.svg"

const Header = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const profileIconRef = useRef(null)
    const { useClickOutside, handleLogout } = useAuth()

    useClickOutside(profileIconRef, () => {
        setIsMenuVisible(false)
    })

    return (
        <header>
            <img src={lightLogo} alt="Predictify logo light coloured" />
            <div ref={profileIconRef}>
                <ProfileCard name={`profile-card-header-container`} onClick={() => setIsMenuVisible(!isMenuVisible)}/>

                {isMenuVisible && 
                    <div className="profile-drop-down-container">
                        <ul className="profile-drop-down-ul">
                            <li>
                                <NavLink to={"/profile"}>
                                    <img src={profileIcon} alt="Profile icon" />
                                    <p>Profile</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/login"} onClick={handleLogout}>
                                    <img src={logoutIcon} alt="Logout icon" />
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