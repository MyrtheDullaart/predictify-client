import { useEffect, useState } from "react"
import Questions from "../../components/questions"
import "./dashboard.css"
import { getQuestions } from "../../service/apiClient"

const Dashboard = () => {
    const [questions, setQuestions] = useState([])
    const [resolved, setResolved] = useState(null)

    useEffect(() => {
        getQuestions(resolved).then(setQuestions)
    }, [resolved])

    const handleChange = (e) => {
        setResolved(e.target.value)
    }

    return (
      <>
        <main>
          <div className="add-filter-container">
            <div className="add-question-button-container">
                <button className="add-question-button">
                    <img src="../../src/assets/plus-icon.svg" alt="Plus icon" />
                </button>
            </div>

            <div className="search-container">
                <input type="search" placeholder="Search"/>

                <div className="search-icon-container">
                    <img src="../../src/assets/search-icon.svg" alt="Search icon" />
                </div>
            </div>

            <div className="filter-container">
                <select name="filter" id="filter" onChange={handleChange}>
                    <option value="">All questions</option>
                    <option value="false">Unresolved questions</option>
                    <option value="true">Resolved questions</option>
                </select>

                <img src="../../src/assets/filter-icon.svg" alt="Filter icon" />
            </div>
          </div>

          <div className="questions-container">
            <Questions questions={questions}/>
          </div>
        </main>
      </>
    )
  }
  
  export default Dashboard