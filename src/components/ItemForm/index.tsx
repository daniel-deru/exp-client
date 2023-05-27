import { useAppDispatch } from '@/store/hooks'
import { Activity, addItem } from '@/store/slices/activitySlice'
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
    quantity: "",
    paid: "No",
    type: "Product",
    tag: ""
}

interface Props {
    activity: Activity | undefined
}

const ItemForm: React.FC<Props> = ({ activity }) => {

    const dispatch = useAppDispatch()

    async function createItem(values: typeof initialValues){

        const paid = values.paid === "Yes" ? true : false
        const quantity = parseInt(values.quantity)
        const price = parseFloat(values.price)

        const activityId = activity?.id ? activity.id : ""

        const response = await call("/item/create/" + activityId, "POST", {...values, paid, quantity, price})
        
        if(response.error) {
            // display error and return from function
      
        } else {
            dispatch(addItem({
                activityId,
                item: response.data
            }))
        }
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
                            <div>Quantity</div>
                            <Field name="quantity" value={values.quantity} onChange={handleChange}/>
                        </div>
                        <div>
                            <div>Paid</div>
                            <select name="paid" id="" value={values.paid} onChange={handleChange}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div>
                            <div>Type</div>
                            <select name="type" id="" value={values.type} onChange={handleChange}>
                                <option value="Product">Product</option>
                                <option value="Service">Service</option>
                            </select>
                        </div>
                        <div>
                            <div>Tag</div>
                            <Field name="tag" value={values.tag} onChange={handleChange}/>
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