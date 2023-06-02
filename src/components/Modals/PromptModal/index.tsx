import React from 'react'
import ModalWrapper from '../ModalWrapper'

interface Props {
    message: string
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    promptAnswer: (answer: boolean) => any
}

const PromptModal: React.FC<Props> = ({ message, showModal, setShowModal, promptAnswer }) => {


    function modalAction(answer: boolean){
        promptAnswer(answer)
        setShowModal(false)
    }

    return (
        <ModalWrapper showModal={showModal}>
            <section>
                <h1>{message}</h1>
                <div>
                    <button onClick={() => modalAction(true)}>Yes</button>
                    <button onClick={() => modalAction(false)}>No</button>
                </div>
            </section>
        </ModalWrapper>
    )
}

export default PromptModal