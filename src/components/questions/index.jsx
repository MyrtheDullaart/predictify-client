import Question from '../question'

const Questions = ({ questions }) => {
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
                    />
                )
            })}
        </ul>
    )
}

export default Questions