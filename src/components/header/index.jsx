import ProfileCard from "../profileCard"
import "./header.css"

const Header = () => {
    return (
        <header>
            <img src="../../src/assets/lightlogo.png" alt="Predictify logo light coloured" />
            <ProfileCard name={`profile-card-header-container`}/>
        </header>
    )
}

export default Header