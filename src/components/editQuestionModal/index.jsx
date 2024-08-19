import { useState } from 'react'
import useModal from '../../hooks/useModal'
import { getQuestions, resolveQuestion } from '../../service/apiClient'
import closeIcon from '../../assets/close-icon.svg'
import './editQuestionModal.css'

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
            <div className='edit-question-container'>
                <div className='edit-question-header'>
                    <h2>Edit question</h2>
                    <button className='close-button' onClick={closeModal}><img src={closeIcon} alt="Close icon" /></button>
                </div>

                <input type="text" value={content} onChange={onChange}/>

                <button onClick={onSubmit}>Submit</button>
            </div>
        </>
    )
}

export default EditQuestionModal