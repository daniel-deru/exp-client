import React, { useEffect } from 'react'
import ModalWrapper from '../ModalWrapper'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectError, setError } from '@/store/slices/errorSlice'


const ErrorModal: React.FC = () => {

    const error = useAppSelector(selectError)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(setError(""))
        }, 4000)
    }, [error.error])

    return (
        <ModalWrapper showModal={error.error} interactive={true}>
            <div>{error.message}</div>
        </ModalWrapper>
    )
}

export default ErrorModal