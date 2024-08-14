import ProfileCardQuestion from "../questionProfileCard"
import "./question.css"

const Question = ({ title, user }) => {
  return (
    <li className="question-li">
        <ProfileCardQuestion user={user}/>
        <p className="question-title">{title}</p>
    </li>
  )
}

export default Question