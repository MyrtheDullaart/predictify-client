import { useContext, useRef, useState } from "react"
import Forecasts from "../forecasts"
import ProfileCardQuestion from "../questionProfileCard"
import "./question.css"
import { createForecast, deleteQuestion, getQuestions, resolveQuestion } from "../../service/apiClient"
import { DataContext } from "../../pages/dashboard"
import useAuth from "../../hooks/useAuth"
import moreIcon from "../../assets/down-arrow-icon.svg"
import optionsIcon from "../../assets/options-icon.svg"
import editIcon from "../../assets/edit-icon.svg"
import deleteIcon from "../../assets/delete-icon.svg"
import useModal from "../../hooks/useModal"
import EditQuestionModal from "../editQuestionModal"

const Question = ({ title, user, forecasts, resolution, questionId }) => {
    const [showMore, setShowMore] = useState(false)
    const { setQuestions, resolved } = useContext(DataContext)
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const resolveButtonRef = useRef(null)
    const optionsButtonRef = useRef(null)
    const { useClickOutside } = useAuth()
    const [options, setOptions] = useState(false)
    const { openModal, setModal } = useModal()
    const [forecastData, setForecastData] = useState({
        questionId: questionId,
        prediction: ""
    })

    useClickOutside(resolveButtonRef, () => {
        setIsMenuVisible(false)
    })

    useClickOutside(optionsButtonRef, () => {
        setOptions(false)
    })

    let forecastAverage = null

    if (forecasts.length > 0) {
        const forecastArray = []

        forecasts.forEach((f) => {
            forecastArray.push(Number(f.prediction))
        })
    
        forecastAverage = ((forecastArray.reduce((a, b) => a + b, 0) / forecastArray.length) * 100).toFixed(0)
    }

    const handleChange = (e) => {
        setForecastData({
            questionId: questionId,
            prediction: e.target.value
        })
    }

    const handleQuickSumbit = async (e) => {
        const inputLength = forecastData.prediction.length

        if (inputLength === 3) {
            e.preventDefault()

            forecastData.prediction = (Number(forecastData.prediction) / 100).toFixed(2)
            
            await createForecast(forecastData)
            getQuestions(resolved).then(setQuestions)

            setForecastData({
                questionId: questionId,
                prediction: ""
            })
        }
    }

    const handleSumbit = async (e) => {
        e.preventDefault()

        forecastData.prediction = (Number(forecastData.prediction) / 100).toFixed(2)
        
        await createForecast(forecastData)
        getQuestions(resolved).then(setQuestions)

        setForecastData({
            questionId: questionId,
            prediction: ""
        })
    }

    const handleYesSumbit = async () => {
        await resolveQuestion({questionId: questionId, resolution: 'YES'})
        getQuestions(resolved).then(setQuestions)
        setIsMenuVisible(!isMenuVisible)
    }

    const handleNoSumbit = async () => {
        await resolveQuestion({questionId: questionId, resolution: 'NO'})
        getQuestions(resolved).then(setQuestions)
        setIsMenuVisible(!isMenuVisible)
    }

    const handleDelete = async () => {
        await deleteQuestion({questionId: questionId})
        getQuestions(resolved).then(setQuestions)
        setOptions(!options)
    }

    const showModal = () => {
        setModal(<EditQuestionModal setQuestions={setQuestions} resolved={resolved} questionId={questionId} title={title}/>)
        setOptions(!options)
        openModal()
    }

    return (
        <li className="question-li">
            <div className="question-container">
                <ProfileCardQuestion user={user}/>
                <p className="question-title">{title}</p>

                <div className="forecast-options-container">
                    <form className="new-forecast-container" onSubmit={handleSumbit}>
                        <input type="text" placeholder={forecastAverage} maxLength={3} onChange={handleChange} onKeyUp={handleQuickSumbit} value={forecastData.prediction} disabled={resolution ? "disabled" : ""}/>
                        <p>%</p>
                    </form>

                    <div className="options-container" ref={optionsButtonRef}>
                        <button className="options-button" onClick={() => setOptions(!options)}><img src={optionsIcon} alt="Options icon" /></button>

                        {options &&
                            <div className="options-drop-down-container">
                                <ul className="options-drop-down-ul">
                                    <li>
                                        <button onClick={showModal}>
                                            <img src={editIcon} alt="Edit icon" />
                                            <p>Edit question</p>
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={handleDelete}>
                                            <img src={deleteIcon} alt="Delete icon" />
                                            <p>Delete question</p>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>

                </div>

            </div>

            <div className="resolution-container">
                <div className="more-container">
                    {forecasts.length > 0 && 
                        <button className="more-button" onClick={() => setShowMore(!showMore)}>
                            <img src={moreIcon} alt="Down arrow icon" />
                        </button>
                    }
                </div>

                <div ref={resolveButtonRef} className="resolve-container">
                    {!resolution && 
                        <button className="resolve-button" onClick={() => setIsMenuVisible(!isMenuVisible)}>Resolve</button>
                    }

                    {isMenuVisible &&
                        <div className="resolve-drop-down-container">
                            <ul className="resolve-drop-down-ul">
                                <li>
                                    <button onClick={handleYesSumbit}>
                                        <div className="green-circle"></div>
                                        <p>Yes</p>
                                    </button>
                                </li>
                                <li>
                                    <button onClick={handleNoSumbit}>
                                        <div className="red-circle"></div>
                                        <p>No</p>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    }
                </div>

                {resolution && 
                    <p className={`resolved ${resolution}`}>{resolution}</p>
                }
            </div>


            {showMore && <Forecasts forecasts={forecasts}/>}
        </li>
    )
}

export default Question