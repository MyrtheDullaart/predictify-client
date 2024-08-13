import "./navigation.css"
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <aside>
            <ul className="navigation-ul">
                <li>
                    <NavLink to={'/'}>
                        <img src="../../src/assets/home-icon.svg" alt="Home icon" />
                        <p className="home-text">Home</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/stats'}>
                        <img src="../../src/assets/notes-icon.svg" alt="Notes icon" />
                        <p>Stats</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/profile'}>
                        <img src="../../src/assets/profile-icon.svg" alt="Profile icon" />
                        <p>Profile</p>
                    </NavLink>
                </li>
            </ul>
            <div className="about-container">
                <NavLink to={'/about'}>
                <img src="../../src/assets/info-icon.svg" alt="Information icon" />
                <p>About</p>
            </NavLink>
            </div>

        </aside>
    )
}

export default Navigation