"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { Activity, Item, selectActivities, addItem } from '@/store/slices/activitySlice'
import styles from "./style.module.scss"
import * as yup from "yup"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { call } from '@/utils/call'

const validationSchema = yup.object().shape({
    name: yup.string(),
    price: yup.string(),
    quantity: yup.string(),
    paid: yup.string(),
    type: yup.string(),
    tag: yup.string()
})
const initialValues = {
    name: "",
    price: "",
    quantity: "",
    paid: "No",
    type: "Product",
    tag: ""
}


const activityPage: React.FC = () => {

    const [activity, setActivity] = useState<Activity>()
    const pathname = usePathname()
    const activities = useAppSelector(selectActivities)
    const dispatch = useAppDispatch()

    async function createItem(values: typeof initialValues){

        const paid = values.paid === "Yes" ? true : false
        const quantity = parseInt(values.quantity)
        const price = parseFloat(values.price)

        const response = await call(`/item/create/${activity?.id}`, "POST", {...values, paid, quantity, price})
        
        if(response.error) {
            // display error and return from function
      
        } else {
            dispatch(addItem({
                activityId: activity?.id || "",
                item: response.data
            }))
            
            console.log(activity)
            setActivity((prevActivity) => {
                prevActivity?.items.push(response.data)
                return prevActivity
            })
        }
    }

    useEffect(() => {

        const pathnameArray = pathname.split("/")

        const id = pathnameArray[pathnameArray.length-1]

        const activity = activities.filter((activity) => activity.id === id)

        setActivity(activity[0])

    }, [activities, activity])

    return (
        <div style={{width: "85vw"}}>
            <h1 className='text-2xl my-4'>{activity?.name}</h1>
            <p>{activity?.description}</p>
            <div className='flex justify-around my-4'>
                <div><b>Status: </b>{activity?.status}</div>
                <div><b>Venue: </b>{activity?.venue}</div>
            </div>
            <section>
                <div className='mr-4'>
                    <div className={styles.itemForm}>
                        <div>Name</div>
                        <div>Price</div>
                        <div>Quantity</div>
                        <div>Paid</div>
                        <div>Type</div>
                        <div>Tag</div>
                        <div></div>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={createItem}
                        validationSchema={validationSchema}
                    >
                        {({values, handleChange}) => (
                            <Form>
                                <div className={`${styles.itemForm} mt-3`}>
                                    <div >
                                        <Field name="name" value={values.name} onChange={handleChange}/>
                                    </div>
                                    <div >
                                        <Field name="price" value={values.price} onChange={handleChange}/>
                                    </div>
                                    <div >
                                        <Field name="quantity" value={values.quantity} onChange={handleChange}/>
                                    </div>
                                    <div>
                                        <select name="paid" id="" value={values.paid} onChange={handleChange}>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div >
                                        <select name="type" id="" value={values.type} onChange={handleChange}>
                                            <option value="Product">Product</option>
                                            <option value="Service">Service</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Field name="tag" value={values.tag} onChange={handleChange}/>
                                    </div>
                                    <div>
                                    <button type='submit'>Add</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    
                </div>
                <h2 className='mt-4'>Items</h2>
                <ul className={styles.itemList}>
                    {activity?.items.map((item: Item) => (
                        <li className='flex justify-between'>
                            <div>{item?.name}</div>
                            <div>{item?.price * item?.quantity}</div>
                            <div>{item?.paid ? "Paid" : "Not Paid"}</div>
                            <div><button>Edit</button></div>
                        </li>
                    ))}
                </ul>

            </section>
        </div>
    )
}

export default activityPage