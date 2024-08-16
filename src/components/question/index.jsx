import { useContext, useEffect, useRef, useState } from "react"
import Forecasts from "../forecasts"
import ProfileCardQuestion from "../questionProfileCard"
import "./question.css"
import { createForecast, getQuestions } from "../../service/apiClient"
import { DataContext } from "../../pages/dashboard"
import useAuth from "../../hooks/useAuth"

const Question = ({ title, user, forecasts, resolution, questionId }) => {
    const [showMore, setShowMore] = useState(false)
    const { setQuestions, resolved } = useContext(DataContext)
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const resolveButtonRef = useRef(null)
    const { useClickOutside } = useAuth()
    const [forecastData, setForecastData] = useState({
        questionId: questionId,
        prediction: ""
    })

    useClickOutside(resolveButtonRef, () => {
        setIsMenuVisible(false)
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

        if (inputLength === 2) {
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


    return (
        <li className="question-li">
            <div className="question-container">
                <ProfileCardQuestion user={user}/>
                <p className="question-title">{title}</p>

                <div className="more-container">
                    {forecasts.length > 0 && 
                        <button className="more-button" onClick={() => setShowMore(!showMore)}>
                            <img src="../../src/assets/down-arrow-icon.svg" alt="Down arrow icon" />
                        </button>
                    }
                </div>

                <form className="new-forecast-container" onSubmit={handleSumbit}>
                    <input type="text" placeholder={forecastAverage} maxLength={2} onChange={handleChange} onKeyUp={handleQuickSumbit} value={forecastData.prediction} disabled={resolution ? "disabled" : ""}/>
                    <p>%</p>
                </form>
            </div>

            <div className="resolution-container">
                {!resolution && 
                    <div className="resolve-container" ref={resolveButtonRef}>
                        <button className="resolve-button" onClick={() => setIsMenuVisible(!isMenuVisible)}>Resolve</button>
                    </div>
                }

                {isMenuVisible &&
                    <div className="resolve-drop-down-container">
                        <ul className="resolve-drop-down-ul">
                            <li>
                                <button>
                                    <div className="green-circle"></div>
                                    <p>Yes</p>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <div className="red-circle"></div>
                                    <p>No</p>
                                </button>
                            </li>
                        </ul>
                    </div>
                }

                {resolution && 
                    <p className={`resolved ${resolution}`}>{resolution}</p>
                }
            </div>


            {showMore && <Forecasts forecasts={forecasts}/>}
        </li>
    )
}

export default Question