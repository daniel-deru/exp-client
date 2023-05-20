"use client"

import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as yup from "yup"
import styles from "../signup/styles.module.scss"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { call } from '@/utils/call'
import { setToken } from '@/utils/token'

interface IInitialValues {
  email: string
  password: string
}

const initialValues: IInitialValues = {
  email: "",
  password: ""
}

const validationSchema = yup.object().shape({
  email: yup.string().required("Required").email("Email Not Valid"),
  password: yup.string().required("Required")
})

const Signin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const router = useRouter()

  async function onSubmit(values: IInitialValues){
    const response = await call<{access_token: string}>('/user/signin', "POST", values)

    if(response.error) return setError(response.message)
    
    setToken(response.data.access_token)

    router.push("/dashboard")

  }

  return (
    <div className={styles.signup}>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({handleChange, values}) => (
          <Form  className='w-2/5 mx-auto rounded-lg'>
            <div>
              <div className='error'>
                <ErrorMessage name='email'/>
              </div>
              <Field name="email" value={values.email} onChange={handleChange} placeholder="Enter Email"/>
            </div>
            <div>
              <div className='error'>
                <ErrorMessage name='password'/>
              </div>
              <Field name="password" value={values.password} onChange={handleChange} placeholder="Enter Password" type={`${showPassword ? "text" : "password" }`}/>
              <div onClick={() => setShowPassword(!showPassword)} className='eye'>
                { showPassword ? <FaEyeSlash /> : <FaEye /> }
              </div>
            </div>
            <div>
              <button className='bg-green-300 py-2 w-full'>Sign In</button>
              <div>{error}</div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Signin