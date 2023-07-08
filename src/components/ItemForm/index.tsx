import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Activity, Item, addItem, selectActivities } from '@/store/slices/activitySlice'
import { call } from '@/utils/call'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import React, { useRef } from 'react'
import * as yup from "yup"
import styles from "./style.module.scss"
import { addShoppingItem, selectItems } from '@/store/slices/shoppingItemSlice'
import { deleteActivity, addActivity } from '@/store/slices/activitySlice'

const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    price: yup.string(),
    quantity: yup.string(),
    paid: yup.string(),
    type: yup.string(),
    tag: yup.string()
})
const initialValues = {
    name: "",
    price: "",
    quantity: "1",
    paid: "No",
    type: "Product",
    tag: ""
}

interface Props {
    activity?: Activity | undefined
}

const ItemForm: React.FC<Props> = ({ activity }) => {

    const dispatch = useAppDispatch()
    const activities = useAppSelector(selectActivities)
    const shoppingListItems = useAppSelector(selectItems)

    const nameFieldRef = useRef<HTMLInputElement>(null)

    async function createItem(values: typeof initialValues, { resetForm }: any){

        const existingItem = shoppingListItems.find(item => item.name.includes(values.name))

        if(existingItem !== undefined) return alert("Looks like this item is already in the shopping list.")
        
        const paid = values.paid === "Yes" ? true : false
        const quantity = parseInt(values.quantity)
        const price = parseFloat(values.price)
        const activityId = activity?.id ? activity.id : ""
        const response = await call<Item>("/item/create/" + activityId, "POST", {...values, paid, quantity, price})

        if(response.error) {
            return alert(response.message) 
        } 

        if(!activityId){
            dispatch(addShoppingItem(response.data))
        } 
        else {
            const activity = activities.filter(activity => activity.id === activityId)[0]
            dispatch(deleteActivity(activity))
            dispatch(addActivity({...activity, items: [...activity.items, response.data]}))
        }

        resetForm({values: ""})
        nameFieldRef.current?.focus()
    }


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={createItem}
            validationSchema={validationSchema}
        >
            {({values, handleChange}) => (
                <Form>
                    <div className={`${styles.itemForm} mt-3`}>
                        <div>
                            <div className='flex'>Name <ErrorMessage name='name'/></div>
                            <Field name="name" value={values.name} onChange={handleChange} innerRef={nameFieldRef}/>
                        </div>
                        <div>
                            <div>Price</div>
                            <Field name="price" value={values.price} onChange={handleChange} min={0}/>
                        </div>
                        <div>
                            <div>Quantity</div>
                            <Field name="quantity" type="number" min={0} value={values.quantity} onChange={handleChange}/>
                        </div>
                        <div>
                            <div></div>
                            <button type='submit'>Add</button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default ItemForm