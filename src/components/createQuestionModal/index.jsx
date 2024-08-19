import { useState } from 'react'
import useModal from '../../hooks/useModal'
import { createQuestion, getQuestions } from '../../service/apiClient'
import './createQuestionModal.css'
import closeIcon from '../../assets/close-icon.svg'

const CreateQuestionModal = ({ setQuestions, resolved }) => {
    const { closeModal } = useModal()
    const [content, setContent] = useState('')

    const onChange = (e) => {
        setContent(e.target.value)
    }

    const onSubmit = async () => {
        const res = await createQuestion({title: content})

        if (res.status === "success") {
            closeModal()
            getQuestions(resolved).then(setQuestions)
        }
    }

    return (
        <>
            <div className='create-question-container'>
                <div className='create-question-header'>
                    <h2>Create question</h2>
                    <button className='close-button' onClick={closeModal}><img src={closeIcon} alt="Close icon" /></button>
                </div>

                <input type="text" placeholder='Will I pass my next exam?' value={content} onChange={onChange}/>

                <button onClick={onSubmit}>Submit</button>
            </div>
        </>
    )
}

export default CreateQuestionModal