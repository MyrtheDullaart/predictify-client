import useAuth from "../../hooks/useAuth"

const ProfileCard = ({ onClick = null, disabled= false}) => {
    const { currentUser } = useAuth()

    return (
        <button className="profile-card-container" onClick={onClick} disabled={disabled}>
            {currentUser && 
                <p>{currentUser.first_name[0].toUpperCase()}{currentUser.last_name[0].toUpperCase()}</p>
            }
        </button>
    )
}

export default ProfileCard