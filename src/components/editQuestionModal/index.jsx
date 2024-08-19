import { useState } from 'react'
import useModal from '../../hooks/useModal'
import { getQuestions, resolveQuestion } from '../../service/apiClient'

const EditQuestionModal = ({ setQuestions, resolved, questionId, title }) => {
    const { closeModal } = useModal()
    const [content, setContent] = useState(title)

    const onChange = (e) => {
        setContent(e.target.value)
    }

    const onSubmit = async () => {
        const res = await resolveQuestion({questionId: questionId, title: content})

        if (res.status === "success") {
            closeModal()
            getQuestions(resolved).then(setQuestions)
        }
    }

    return (
        <>
            <div className='create-question-container'>
                <h2>Edit question</h2>

                <input type="text" value={content} onChange={onChange}/>

                <button onClick={onSubmit}>Submit</button>
            </div>
        </>
    )
}

export default EditQuestionModal