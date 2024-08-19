import { createContext, useState } from "react"

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [modalComponent, setModalComponent] = useState(null)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const setModal = (component) => {
        setModalComponent(component)
    }

    const value = {
        isOpen,
        openModal,
        closeModal,
        setModal,
        modalComponent
    }

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export { ModalContext, ModalProvider }