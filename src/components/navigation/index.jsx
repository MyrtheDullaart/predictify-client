import "./navigation.css"
import { NavLink } from 'react-router-dom'
import homeIcon from '../../assets/home-icon.svg'
import notesIcon from '../../assets/notes-icon.svg'
import profileIcon from '../../assets/profile-icon.svg'
import aboutIcon from '../../assets/info-icon.svg'

const Navigation = () => {
    function currentPage() {
        const url = window.location.href
        const currentLinks = document.querySelectorAll("a")

        currentLinks.forEach((link) => {
            if (link.href === url) {
                const currentLink = link
                currentLink.className += ' current'
            }
        })
    }

    currentPage()

    return (
        <aside>
            <ul className="navigation-ul">
                <li>
                    <NavLink to={'/'}>
                        <img src={homeIcon} alt="Home icon" />
                        <p>Home</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/stats'}>
                        <img src={notesIcon} alt="Notes icon" />
                        <p>Stats</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/profile'}>
                        <img src={profileIcon} alt="Profile icon" />
                        <p>Profile</p>
                    </NavLink>
                </li>
            </ul>
            <div className="about-container">
                <NavLink to={'/about'}>
                <img src={aboutIcon} alt="Information icon" />
                <p>About</p>
            </NavLink>
            </div>

        </aside>
    )
}

export default Navigation