"use client"

import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import styles from "./styles.module.scss"
import { call } from '../../utils/call'
import { setToken } from '@/utils/token'


interface IIntialValues {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

const initialValues: IIntialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Too Short").max(20, "Too Long").required("Required"),
    lastName: Yup.string().min(2, "Too Short").max(20, "Too Long").required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string().required("Required").min(8, "Too Short"),
    confirmPassword: Yup.string().required("Required")
})

const Signup = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    async function onSubmit(values: IIntialValues){

        const passwordMatch = values.password !== values.confirmPassword
        
        if(passwordMatch) return setError("Passwords do not match")

        let payload: any = {...values}

        delete payload.confirmPassword

        const response = await call("/user/signup", "POST", payload)

        if(response.error)  return setError(response.message)

        setToken(response.data)
    }

    return (
        <main className={styles.signup}>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={SignUpSchema}
            >
                {({ values, handleChange }) => (
                    <Form className='w-2/5 mx-auto rounded-lg'>
                        <div>
                            <div className='error'>
                                <ErrorMessage name="firstName" />
                            </div>
                            <Field name="firstName" value={values.firstName} onChange={handleChange} placeholder="First Name"/>
                        </div>
                        <div>
                            <div  className='error'>
                                <ErrorMessage name="lastName"/>
                            </div>
                            <Field name="lastName" value={values.lastName} onChange={handleChange} placeholder="Last Name"/>
                        </div>
                        <div>
                            <div  className='error'>
                                <ErrorMessage name="email"/>
                            </div>
                            <Field name="email" value={values.email} onChange={handleChange} placeholder="Email"/>
                        </div>
                        <div>
                            <div className='error'>
                                <ErrorMessage name="password" />
                            </div>
                            <Field type={`${showPassword ? "text" : "password"}`} name="password" value={values.password} onChange={handleChange} placeholder="Password"/>
                            <div className='eye' onClick={() => setShowPassword(!showPassword)}>
                                { showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        <div>
                            <div className='error'>
                                <ErrorMessage name="confirmPassword"/>
                            </div>
                            <Field type={`${showConfirmPassword ? "text" : "password"}`} name="confirmPassword" value={values.confirmPassword} onChange={handleChange} placeholder="Confirm Password"/>
                            <div className='eye' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                { showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        <div>
                            <button className='bg-green-300 py-2 w-full'>Sign Up</button>
                            <div className='text-red-400 flex justify-center mt-2'>    
                                {error}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    )
}

export default Signup