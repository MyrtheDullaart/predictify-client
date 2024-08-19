import { useState } from 'react'
import useModal from '../../hooks/useModal'
import { createQuestion, getQuestions } from '../../service/apiClient'
import './createQuestionModal.css'

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
                <h2>Create question</h2>

                <input type="text" placeholder='Will I pass my next exam?' value={content} onChange={onChange}/>

                <button onClick={onSubmit}>Submit</button>
            </div>
        </>
    )
}

export default CreateQuestionModal