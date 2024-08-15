import Question from '../question'

const Questions = ({ questions, setQuestions }) => {
    return (
        <ul className='questions-ul'>
            {questions.map((question) => {
                return (
                    <Question
                        key={question.id}
                        title={question.title}
                        user= {question.user}
                        forecasts={question.forecasts}
                        resolution={question.resolution}
                        questionId={question.id}
                    />
                )
            })}
        </ul>
    )
}

export default Questions