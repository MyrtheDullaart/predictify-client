import { useState } from "react"
import Forecasts from "../forecasts"
import ProfileCardQuestion from "../questionProfileCard"
import "./question.css"

const Question = ({ title, user, forecasts, resolution }) => {
    const [showMore, setShowMore] = useState(false)
    const [forecast, setForecast] = useState("")
    let forecastAverage = null

    if (forecasts.length >0) {
        const forecastArray = []

        forecasts.forEach((f) => {
            forecastArray.push(Number(f.prediction))
        })
    
        forecastAverage = ((forecastArray.reduce((a, b) => a + b, 0) / forecastArray.length) * 100).toFixed(0)
    }

    const handleChange = (e) => {
        setForecast(e.target.value)
    }

    const handleSumbit = (e) => {
        const inputLength = forecast.length

        if (inputLength === 2) {
           e.preventDefault()

           setForecast("")
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
                    <input type="text" placeholder={forecastAverage} maxLength={2} onChange={handleChange} onKeyUp={handleSumbit} value={forecast}/>
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