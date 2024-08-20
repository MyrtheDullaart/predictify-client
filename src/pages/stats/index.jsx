import { useEffect, useState } from 'react'
import './stats.css'
import { getQuestions } from '../../service/apiClient'

const StatsPage = () => {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        getQuestions(true).then(setQuestions)
    }, [])

    const brierScores = []

    questions.map((question) => {
        brierScores.push(Number(question.brierScore))
    })

    let brierScoreAverage = null

    if (brierScores.length > 0) {
        brierScoreAverage = (brierScores.reduce((a, b) => a + b, 0) / brierScores.length).toFixed(2)
    }

    return (
      <>
        <main className='stats-container'>
            <div className="briar-score-container">
                <h2>Average Brier Score</h2>

                {brierScoreAverage && 
                    <p>{brierScoreAverage}</p>
                }

                {!brierScoreAverage &&
                    <div>
                        <p className='no-score'>No score yet.</p>
                        <p className='no-score'>Resolve your first question to get a score!</p>
                    </div>
                }
            </div>

        </main>
      </>
    )
  }
  
  export default StatsPage