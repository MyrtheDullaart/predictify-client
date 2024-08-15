import { useContext, useEffect, useState } from "react"
import Forecasts from "../forecasts"
import ProfileCardQuestion from "../questionProfileCard"
import "./question.css"
import { createForecast, getQuestions } from "../../service/apiClient"
import { DataContext } from "../../pages/dashboard"

const Question = ({ title, user, forecasts, resolution, questionId }) => {
    const [showMore, setShowMore] = useState(false)
    const [forecastData, setForecastData] = useState({
        questionId: questionId,
        prediction: ""
    })
    const { questions, setQuestions, resolved } = useContext(DataContext)


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

    const handleSumbit = async (e) => {
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

                <div className="new-forecast-container">
                    <input type="text" placeholder={forecastAverage} maxLength={2} onChange={handleChange} onKeyUp={handleSumbit} value={forecastData.prediction} disabled={resolution ? "disabled" : ""}/>
                    <p>%</p>
                </div>
            </div>

            <div className="resolution-container">
                {!resolution && 
                    <button className="resolve-button">Resolve</button>
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