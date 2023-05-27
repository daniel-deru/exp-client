"use client"

import React, { useEffect, useState } from 'react'
import { Formik, ErrorMessage, Form, Field } from 'formik'
import * as yup from "yup"
import form from "@/styles/form.module.scss"
import { call } from '@/utils/call'
import { useRouter } from 'next/navigation'
import styles from "./newActivity.module.scss"

const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    venue: yup.string(),
    datePlanned: yup.string(),
    description: yup.string(),
    tag: yup.string().max(15, "Tag Too Long")
})

const initialValues = {
    name: "",
    venue: "",
    datePlanned: new Date(),
    description: "",
    tag: ""
}

const newActivity: React.FC = () => {

    const [showOptional, setShowOptional] = useState<boolean>(false)

    const router = useRouter()

    async function onSubmit(values: typeof initialValues){

        const datePlanned = new Date(values.datePlanned).toISOString()

        console.log(datePlanned)

        const response = await call("/activity/create", "POST", {...values, datePlanned})

        if(response.error) return console.log(response.message)

        router.push('/dashboard/activities')
    }

    return (
        <main className={styles.newActivity}>
            <h1 className='text-center text-xl mt-4'>Create a new activity</h1>
            <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ values, handleChange }) => (
                    <Form className={form.form}>
                        <div className={showOptional ? styles.hide : styles.show}>
                            <label htmlFor="name">Name</label>
                            <Field name="name" value={values.name} onChange={handleChange}/>
                        </div>
                        <div  className={showOptional ? styles.show : styles.hide}>
                            <label htmlFor="venue">Venue</label>
                            <Field name="venue" value={values.venue} onChange={handleChange}/>
                        </div>
                        <div  className={showOptional ? styles.show : styles.hide}>
                            <label htmlFor="datePlanned">Date Planned</label>
                            <Field type="date" name="datePlanned" value={values.datePlanned} onChange={handleChange}/>
                        </div>
                        <div  className={showOptional ? styles.show : styles.hide}>
                            <label htmlFor="description">Description</label>
                            <Field name="description" value={values.description} onChange={handleChange}/>
                        </div>
                        <div  className={showOptional ? styles.show : styles.hide}>
                            <label htmlFor="tag">Tag</label>
                            <Field name="tag" value={values.tag} onChange={handleChange}/>
                        </div>
                        <div className='flex justify-between'>
                            <button 
                                type='button' 
                                className={styles.button}
                                onClick={() => setShowOptional(!showOptional)}
                            >
                                Show {showOptional ? "Required" : "Optional"}
                            </button>
                            <button type='submit' className={styles.button}>Create</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    )
}

export default newActivity