import { useEffect, useState } from "react"
import Questions from "../../components/questions"
import "./dashboard.css"
import { getQuestions } from "../../service/apiClient"

const Dashboard = () => {
    const [questions, setQuestions] = useState([])
    const [resolved, setResolved] = useState("")
    const [search, setSearch] = useState("")

    useEffect(() => {
        getQuestions(resolved).then(setQuestions)
    }, [resolved])

    const handleChange = (e) => {
        setResolved(e.target.value)
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchSumbit = (e) => {
        e.preventDefault()

        getQuestions(resolved, search).then(setQuestions)
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

            <form className="search-container" onSubmit={handleSearchSumbit}>
                <input className="search" type="search" placeholder="Search" value={search} onChange={handleSearchChange}/>

                <div className="search-icon-container">
                    <img src="../../src/assets/search-icon.svg" alt="Search icon" />
                </div>
            </form>

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