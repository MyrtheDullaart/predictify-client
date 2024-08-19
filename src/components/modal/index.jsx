import ReactModal from "react-modal"
import useModal from "../../hooks/useModal.jsx"
import style from './style.js'

ReactModal.setAppElement('#root')

const Modal = ({ width = '612px' }) => {
    const { isOpen, closeModal, modalComponent } = useModal()

    style.content.width = width

    return (
        <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={style}
        >
            <div className="modal-body">
                <section className="modal-content">
                    {modalComponent}
                </section>
            </div>
        </ReactModal>
    )
}

export default Modal