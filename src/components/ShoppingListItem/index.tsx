import { Item } from '@/store/slices/activitySlice'
import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { removeItem, addItem, selectShoppingListSelected } from '@/store/slices/shoppingListSelected'
import { deleteShoppingItem } from '@/store/slices/shoppingItemSlice'
import { FaRegTimesCircle } from "react-icons/fa"
import { call } from '@/utils/call'

interface Props {
    item: Item
}

const ShoppingListItem: React.FC<Props> = ({ item }) => {
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

        // TODO: Confirm what the first dispatch does.
        dispatch(removeItem(item))
        dispatch(deleteShoppingItem(item))
    }

    useEffect(() => {
        const selectedItem = selectedItems.find(selectedItem => selectedItem.id === item.id)
        if(selectedItem) setSelected(true)
    }, [])

    return (
        <li key={item.id} className={`rounded shadow my-3 p-1 flex justify-between ${selected ? "bg-sky-100" : ""}`}>
            <div className='w-2/5'>
                <input checked={selected} type="checkbox" onChange={() => checkboxHandler()} className='mx-2 cursor-pointer'/>
                <span>{item.name}</span>
            </div>
            <div className='w-1/5'>Price: {item.price || "Not Set"}</div>
            <div className='w-1/5'>Qty: {item.quantity}</div>
            <div className="text-red-500 text-xl"><button onClick={() => deleteItem()}><FaRegTimesCircle /></button></div>
        </li>
    )
}

export default ShoppingListItem