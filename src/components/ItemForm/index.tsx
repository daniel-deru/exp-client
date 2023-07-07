import { useAppDispatch } from '@/store/hooks'
import { Activity, Item, addItem } from '@/store/slices/activitySlice'
import { call } from '@/utils/call'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import React, { useRef } from 'react'
import * as yup from "yup"
import styles from "./style.module.scss"
import { addShoppingItem } from '@/store/slices/shoppingItemSlice'

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

    const nameFieldRef = useRef<HTMLInputElement>(null)

    async function createItem(values: typeof initialValues, { resetForm }: any){

        
        const paid = values.paid === "Yes" ? true : false
        const quantity = parseInt(values.quantity)
        const price = parseFloat(values.price)

        const activityId = activity?.id ? activity.id : ""

        const response = await call<Item>("/item/create/" + activityId, "POST", {...values, paid, quantity, price})

        
        if(response.error) {
            alert(response.message)
            return
        } 
        
        // TODO: Add condition here to check if shopping list item or activity item to update accordingly
        dispatch(addShoppingItem(response.data))

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