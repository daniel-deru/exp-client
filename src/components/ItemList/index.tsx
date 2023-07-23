import { useEffect, useState } from "react"
import { Activity, Item } from '@/store/slices/activitySlice'
import React from 'react'
import styles from "./styles.module.scss"
import { FaRegTimesCircle } from "react-icons/fa"
import { call } from '@/utils/call'
import { updateActivity } from "@/store/slices/activitySlice"
import { useAppDispatch } from "@/store/hooks"



interface Props {
    activity: Activity
}

const ItemList: React.FC<Props> = ({ activity }) => {

    const [items, setItems] = useState<Item[]>([])

    const dispatch = useAppDispatch()

    async function deleteItem(item: Item){
      const confirmDelete = confirm("Are you sure you want to delete this item")

      if(!confirmDelete) return

      const response = await call(`/item/delete/${item.id}`, "DELETE")

      if(response.error) return response.error

      const newItems = [...items].filter(curItem => curItem.id !== item.id)

      setItems(newItems)
      dispatch(updateActivity({...activity, items: newItems}))      
    }

    useEffect(() => {
      setItems(activity.items)
    }, [activity])

    return (
      <ul className={styles.itemList}>
        {items?.map((item: Item) => (
            <li className='flex justify-between' key={item.id}>
                <div>{item?.name}</div>
                <div>{item?.price * item?.quantity}</div>
                <div className={styles.paid}>{item?.completed ? "Paid" : "Not Paid"}</div>
                <div>
                  <button>Edit</button>
                </div>
                <div className="text-right text-red-500 text-xl">
                  <button onClick={() => deleteItem(item)}><FaRegTimesCircle/></button>
                </div>
            </li>
        ))}
      </ul>
  )
}

export default ItemList