"use client"

import React, { useEffect, useState } from 'react'
import { Formik, ErrorMessage, Form, Field } from 'formik'
import * as yup from "yup"
import form from "@/styles/form.module.scss"
import { call } from '@/utils/call'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from "./newActivity.module.scss"
import { selectShoppingListSelected } from '@/store/slices/shoppingListSelected'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { Activity, Item, addActivity } from '@/store/slices/activitySlice'
import { deleteShoppingItem } from '@/store/slices/shoppingItemSlice'

const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    venue: yup.string(),
    description: yup.string(),
    tag: yup.string().max(15, "Tag Too Long")
})

const initialValues = {
    name: "",
    venue: "",
    description: "",
    tag: ""
}

const newActivity: React.FC = () => {

    const [showOptional, setShowOptional] = useState<boolean>(false)

    const router = useRouter()
    const searchParams = useSearchParams()
    const selectedItems = useAppSelector(selectShoppingListSelected)

    const dispatch = useAppDispatch()

    async function onSubmit(values: typeof initialValues){

        const withItems = searchParams.get("withItems")

        const response = await call<Activity>("/activity/create", "POST", values)

        if(response.error) {
            return alert(`An Error Occurred: ${response.message}`)
        }

        const activityId = response.data.id
        
        let newItems: Item[] = []
        
        if(withItems === "true"){


            for(let item of selectedItems){
                const addItemsResponse = await call(`item/edit/${item.id}`, "PATCH", { activityId })
                
                if(addItemsResponse.error){
                    alert(`An error occurred: ${addItemsResponse.message}`)
                    return
                } 
                
                newItems.push(addItemsResponse.data)
            }
            
            
        }

        dispatch(addActivity({...response.data, items: newItems }))
        
        for(let item of newItems){
            dispatch(deleteShoppingItem(item))
        }

        router.push(`/dashboard/activities/${activityId}`)
        
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
                            <label htmlFor="name">Activity Occurence <ErrorMessage name="name" /></label>
                            
                            <Field className={styles.select} as="select" name="name" id="name" value={values.name} onChange={handleChange}>
                                <option value="" disabled>Please select a frequency</option>
                                <option value="Spontaneous">Spontaneous</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Bi-Weekly">Bi-Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Bi-Monthly">Bi-Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </Field>
                        </div>
                        <div  className={showOptional ? styles.show : styles.hide}>
                            <label htmlFor="venue">Venue</label>
                            <Field name="venue" value={values.venue} onChange={handleChange}/>
                        </div>
                        <div  className={showOptional ? styles.show : styles.hide}>
                            <label htmlFor="description">Description</label>
                            <Field name="description" value={values.description} onChange={handleChange}/>
                        </div>
                        <div  className={showOptional ? styles.show : styles.hide}>
                            <label htmlFor="tag">Tag</label>
                            <Field name="tag" value={values.tag} onChange={handleChange}/>
                        </div>
                        <div className={`flex justify-between ${styles.buttonContainer}`}>
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