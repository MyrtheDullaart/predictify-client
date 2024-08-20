import { useEffect, useState } from 'react'
import './stats.css'
import { getQuestions } from '../../service/apiClient'
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"

const StatsPage = () => {
    const [questions, setQuestions] = useState([])
    const [rowData, setRowData] = useState([
        { Prediction_Strategy: "Perfect Score", Brier_Score: "0.00", Interpretation: 'Ideal predictions, always correct' },
        { Prediction_Strategy: "Excellent Forecaster", Brier_Score: "0.05", Interpretation: 'Very accurate predictions' },
        { Prediction_Strategy: "Good Forecaster", Brier_Score: "0.15", Interpretation: 'Solid reliable predictions' },
        { Prediction_Strategy: "Moderate Forecaster", Brier_Score: "0.20", Interpretation: 'Above average, room for improvement' },
        { Prediction_Strategy: "Random Guessing (always 50%)", Brier_Score: "0.25", Interpretation: 'No skill, pure chance' },
        { Prediction_Strategy: "Poor Forecaster", Brier_Score: "0.35", Interpretation: 'Inaccurate, but not entirely random' },
        { Prediction_Strategy: "Very Poor Forecaster", Brier_Score: "0.45", Interpretation: 'Highly inaccurate predictions' },
        { Prediction_Strategy: "Terrible Score (always wrong)", Brier_Score: "1.00", Interpretation: 'Worst possible score, completely incorrect' }
      ])
      

    const [colDefs, setColDefs] = useState([
    { field: "Prediction_Strategy", flex: 3 },
    { field: "Brier_Score", flex: 1.5 },
    { field: "Interpretation", flex: 3.5 }
    ])

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
            <div >
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
            </div>

            <div className='explanation-container ag-theme-quartz'>
                <AgGridReact rowData={rowData} columnDefs={colDefs} />
            </div>

        </main>
      </>
    )
  }
  
  export default StatsPage