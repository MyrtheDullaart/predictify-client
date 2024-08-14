import Question from '../question'

const Questions = ({ questions }) => {
    return (
        <ul>
            {questions.map((question) => {
                return (
                    <Question
                        key={question.id}
                        title={question.title}
                    />
                )
            })}
        </ul>
    )
}

export default Questions