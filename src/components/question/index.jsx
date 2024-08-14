import { useState } from "react"
import Forecasts from "../forecasts"
import ProfileCardQuestion from "../questionProfileCard"
import "./question.css"

const Question = ({ title, user, forecasts }) => {
    const [showMore, setShowMore] = useState(false)
    let forecastAverage = null

    if (forecasts.length >0) {
        const forecastArray = []

        forecasts.forEach((f) => {
            forecastArray.push(Number(f.prediction))
        })
    
        forecastAverage = ((forecastArray.reduce((a, b) => a + b, 0) / forecastArray.length) * 100).toFixed(0) + '%'
    }


    return (
        <li className="question-li">
            <ProfileCardQuestion user={user}/>
            <p className="question-title">{title}</p>

            {forecastAverage && 
                <p>{forecastAverage}</p>
            }

            {forecasts.length > 0 && 
                <button className="more-button" onClick={() => setShowMore(!showMore)}>
                    <img src="../../src/assets/down-arrow-icon.svg" alt="Down arrow icon" />
                </button>
            }

            {showMore && <Forecasts forecasts={forecasts}/>}
        </li>
    )
}

export default Question