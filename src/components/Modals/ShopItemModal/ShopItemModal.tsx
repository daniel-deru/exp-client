import React, { useRef, useState } from 'react'
import ModalWrapper from '../ModalWrapper'
import { ItemComplete, ItemDetail } from '@/app/dashboard/activities/[id]/start/page'
import styles from "./shopItem.module.scss"
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { deleteActivity, addActivity, selectActivities, Item } from '@/store/slices/activitySlice'
import { call } from '@/utils/call'

interface Props {
    setItemDetail: React.Dispatch<React.SetStateAction<boolean>>
    showItemDetail: boolean
    item: Item | undefined,
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

const ShopItemModal: React.FC<Props> = ({ setItemDetail, item, setItems, showItemDetail }) => {

    const priceRef = useRef<HTMLInputElement>(null)
    const quantityRef = useRef<HTMLInputElement>(null)

    const activities = useAppSelector(selectActivities)
    const dispatch = useAppDispatch()

    function parseValue(valueRef: React.RefObject<HTMLInputElement>){
        const valueString = valueRef?.current?.value || ""

        if(!valueString) {
            return alert("Value is not defined")
        }

        return parseFloat(valueString)
    }

    async function update(){

        if(!item) return

        const price = parseValue(priceRef)
        const quantity = parseValue(quantityRef)
        
        let updatedItem = { ...item, completed: true }

        let updateValues = { 
            price: item.price, 
            quantity: item?.quantity,
            completed: true
        }

        if(price && price !== updatedItem.price){
            updatedItem.price = price
            updateValues.price = price
        }

        if(quantity && quantity !== updatedItem.quantity){
            updatedItem.quantity = quantity
            updateValues.quantity = quantity
        }

        // TODO: THis is a scalibility issue need to move this call
        const response = await call<Item>(`/item/edit/${item?.id}`, "PATCH", updateValues)
        
        if(response.error) return alert(response.message)

        const activity = activities.filter(act => act.id === updatedItem.activityId)[0]
        

        if(activity){
            const otherItems = activity.items.filter(it => it.id !== updatedItem.id)
            dispatch(deleteActivity(activity))
            addActivity({...activity, items: [...otherItems, updatedItem]})
        }


        setItemDetail(false)
        
    }
    
    return (
        <ModalWrapper showModal={showItemDetail}>
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