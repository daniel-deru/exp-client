import React, { useEffect, useRef, useState } from 'react'
import ModalWrapper from '../ModalWrapper'
import styles from "./shopItem.module.scss"
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { deleteActivity, addActivity, selectActivities, Item } from '@/store/slices/activitySlice'
import { setCookie } from '@/utils/cookie'

interface Props {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    showModal: boolean
    item: Item | undefined,
}

const ShopItemModal: React.FC<Props> = ({ setShowModal, item, showModal }) => {

    const priceRef = useRef<HTMLInputElement>(null)
    const quantityRef = useRef<HTMLInputElement>(null)

    const activities = useAppSelector(selectActivities)
    const dispatch = useAppDispatch()

    // Parses value from a ref object to be used
    function parseValue(valueRef: React.RefObject<HTMLInputElement>){
        const valueString = valueRef?.current?.value || ""

        if(!valueString) {
            return alert("Value is not defined")
        }

        return parseFloat(valueString)
    }

    // onClick callback. Confirms and updates the values if changes are needed
    async function update(){
        const price = parseValue(priceRef)
        const quantity = parseValue(quantityRef)
        
        if(!item) return
        if(!price || !quantity) return alert("Price or quantity is undefined")

        // Update the necessary data
        let updatedItem: Item = { ...item, price, quantity, completed: true }
        
        const activity = activities.filter(act => act.id === updatedItem.activityId)[0]
        
        if(!activity) return alert("No activity found!")

        // Get the items that aren't changed
        const otherItems: Item[] = activity.items.filter(it => it.id !== updatedItem.id)

        // create a copy of the state
        const activityCopy = { ...activity }

        // add the updated item to the activity
        activityCopy.items = [...otherItems, updatedItem]

        // Set the activity to the cookie since this is where the active item is stored.
        setCookie("activeActivity", JSON.stringify(activityCopy), "30d")

        // Update the item in the data store
        // TODO: Find a beter way of doing this
        dispatch(deleteActivity(activity))
        dispatch(addActivity({...activity, items: [...otherItems, updatedItem]}))

        // Close the modal
        setShowModal(false)
        
    }
    
    return (
        <ModalWrapper showModal={showModal}>
            <div className={styles.shopItemModal}>
                <h1 className="text-center mb-3">Enter Details</h1>
                <div>
                    <div>{item?.name}</div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input 
                            type="number" 
                            name='price' 
                            defaultValue={item?.price} 
                            autoFocus
                            ref={priceRef}
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <input 
                            type="number" 
                            name='quantity' 
                            defaultValue={item?.quantity}
                            ref={quantityRef}
                        />
                    </div>
                </div>
                <button onClick={() => update()}>Complete</button>
            </div>

        </ModalWrapper>
    )
}

export default ShopItemModal