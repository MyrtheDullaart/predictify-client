import { useEffect, useState } from "react"
import Questions from "../../components/questions"
import "./dashboard.css"
import { getQuestions } from "../../service/apiClient"

const Dashboard = () => {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        getQuestions().then(setQuestions)
    }, [])

    return (
      <>
        <main>
          <div className="filter-container">
            <button className="add-question-button"><img src="../../src/assets/plus-icon.svg" alt="Plus icon" /></button>

          </div>

          <div className="questions-container">
            <Questions questions={questions}/>
          </div>
        </main>
      </>
    )
  }
  
  export default Dashboard