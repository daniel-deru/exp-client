import { useAppDispatch } from '@/store/hooks'
import { Activity, Item, addItem } from '@/store/slices/activitySlice'
import { call } from '@/utils/call'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from "yup"
import styles from "./style.module.scss"

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
    quantity: "1",
    paid: "No",
    type: "Product",
    tag: ""
}

interface Props {
    activity: Activity | undefined,
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

const ItemForm: React.FC<Props> = ({ activity, setItems }) => {

    const dispatch = useAppDispatch()

    async function createItem(values: typeof initialValues, { resetForm }: any){

        
        const paid = values.paid === "Yes" ? true : false
        const quantity = parseInt(values.quantity)
        const price = parseFloat(values.price)

        const activityId = activity?.id ? activity.id : ""

        const response = await call<Item>("/item/create/" + activityId, "POST", {...values, paid, quantity, price})

        
        if(response.error) {
            // display error and return from function
            return
      
        } 
        setItems(prevItems => [...prevItems, response.data])

        if(activityId) {
            dispatch(addItem({
                activityId,
                item: response.data
            }))
        }
        resetForm({values: ""})
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
                            <div>Name</div>
                            <Field name="name" value={values.name} onChange={handleChange}/>
                        </div>
                        <div>
                            <div>Price</div>
                            <Field name="price" value={values.price} onChange={handleChange}/>
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