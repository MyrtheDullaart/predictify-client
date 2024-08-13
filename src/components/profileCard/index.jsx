import useAuth from "../../hooks/useAuth"

const ProfileCard = () => {
    const { currentUser } = useAuth()

    return (
        <div className="profile-card-container">
            {currentUser && 
                <p>{currentUser.first_name[0].toUpperCase()}{currentUser.last_name[0].toUpperCase()}</p>
            }
        </div>
    )
}

export default ProfileCard