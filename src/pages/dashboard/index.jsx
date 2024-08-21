import { createContext, useEffect, useState } from "react"
import Questions from "../../components/questions"
import "./dashboard.css"
import { getQuestions } from "../../service/apiClient"
import plusIcon from "../../assets/plus-icon.svg"
import filterIcon from "../../assets/filter-icon.svg"
import searchIcon from "../../assets/search-icon.svg"
import useModal from "../../hooks/useModal"
import CreateQuestionModal from "../../components/createQuestionModal"

export const DataContext = createContext("")

const Dashboard = () => {
    const [questions, setQuestions] = useState([])
    const [resolved, setResolved] = useState("")
    const [search, setSearch] = useState("")
    const { openModal, setModal } = useModal()

    useEffect(() => {
        getQuestions(resolved).then(setQuestions)
    }, [resolved])

    const handleChange = (e) => {
        setResolved(e.target.value)
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchSumbit = async (e) => {
        e.preventDefault()

        await getQuestions(resolved, search).then(setQuestions)
    }

    const showModal = () => {
        setModal(<CreateQuestionModal setQuestions={setQuestions} resolved={resolved} />)
        openModal()
    }

    return (
      <>
        <DataContext.Provider value={{questions, setQuestions, resolved}}>
            <main>
                <div className="add-filter-container">
                    <div className="add-question-button-container">
                        <button className="add-question-button" onClick={showModal}>
                            <img src={plusIcon} alt="Plus icon" />
                        </button>
                    </div>

                    <form className="search-container" onSubmit={handleSearchSumbit}>
                        <input className="search" type="search" placeholder="Search" value={search} onChange={handleSearchChange}/>

                        <div className="search-icon-container">
                            <img src={searchIcon} alt="Search icon" />
                        </div>
                    </form>

                    <div className="filter-container">
                        <select name="filter" id="filter" onChange={handleChange}>
                            <option value="">All questions</option>
                            <option value="false">Unresolved questions</option>
                            <option value="true">Resolved questions</option>
                        </select>

                        <img src={filterIcon} alt="Filter icon" />
                    </div>
                </div>

                <div className="questions-container">
                    <Questions questions={questions}/>
                </div>
                
                <div className="no-questions">
                    {questions.length === 0 && !resolved && 
                        <p>No questions yet. Create your first question!</p>
                    }
                </div>

            </main>
        </DataContext.Provider>
      </>
    )
  }
  
  export default Dashboard