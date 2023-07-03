import React, { useEffect } from 'react'
import styles from "./styles.module.scss"

interface Props {
    children: React.ReactNode,
    showModal: boolean,
    interactive?: boolean
}

const ModalWrapper: React.FC<Props> = ({ children, showModal, interactive = false }) => {

    if(!showModal) return null

    return (
        <div 
            className={
                showModal ? 
                    interactive ? 
                        styles.modalOn 
                        : 
                        `${styles.modalOn} ${styles.cover}` 
                    : 
                    styles.modalOff}
        >
            {children}
        </div>
    )
}

export default ModalWrapper