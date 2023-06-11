import { Item } from '@/store/slices/activitySlice'
import React, { useState, useEffect } from 'react'
import styles from "./styles.module.scss"
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { removeItem, addItem, selectShoppingListSelected } from '@/store/slices/shoppingListSelected'
import { FaRegTimesCircle } from "react-icons/fa"
import { call } from '@/utils/call'

interface Props {
    item: Item
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

const ShoppingListItem: React.FC<Props> = ({ item, setItems }) => {
    const [selected, setSelected] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const selectedItems = useAppSelector(selectShoppingListSelected)

    function checkboxHandler(){

        if(selected) dispatch(removeItem(item))
        else dispatch(addItem(item))

        setSelected(!selected)
    }

    async function deleteItem(){

        const confirmDelete = confirm("Are you sure you want to delete this item?")

        if(!confirmDelete) return

        const response = await call(`/item/delete/${item.id}`, "DELETE")

        if(response.error) return response.error

        dispatch(removeItem(item))

        setItems(prevItems => prevItems.filter(curItem => curItem.id !== item.id))
    }

    useEffect(() => {
        const selectedItem = selectedItems.find(selectedItem => selectedItem.id === item.id)
        if(selectedItem) setSelected(true)
    }, [])

    return (
        <li key={item.id} className={`rounded shadow my-3 p-1 flex justify-between ${selected ? "bg-sky-100" : ""}`}>
            <div>
                <input checked={selected} type="checkbox" onChange={() => checkboxHandler()} className='mx-2 cursor-pointer'/>
                <span>{item.name}</span>
            </div>
            <div>{item.price}</div>
            <div>{item.tag}</div>
            <div className="text-red-500 text-xl"><button onClick={() => deleteItem()}><FaRegTimesCircle /></button></div>
        </li>
    )
}

export default ShoppingListItem