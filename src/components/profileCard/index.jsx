import useAuth from "../../hooks/useAuth"

const ProfileCard = ({ onClick = null }) => {
    const { currentUser } = useAuth()

    return (
        <button className="profile-card-container" onClick={onClick}>
            {currentUser && 
                <p>{currentUser.first_name[0].toUpperCase()}{currentUser.last_name[0].toUpperCase()}</p>
            }
        </button>
    )
}

export default ProfileCard