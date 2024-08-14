const ProfileCardQuestion = ({ user }) => {
    return (
        <div className="profile-card-question-container">
            <p>{user.first_name[0].toUpperCase()}{user.last_name[0].toUpperCase()}</p>
        </div>
    )
}

export default ProfileCardQuestion