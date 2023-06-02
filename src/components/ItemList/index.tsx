import { Item } from '@/store/slices/activitySlice'
import React from 'react'
import styles from "./styles.module.scss"
import { FaRegTimesCircle } from "react-icons/fa"
import { call } from '@/utils/call'


interface Props {
    items: Item[],
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

const ItemList: React.FC<Props> = ({ items, setItems }) => {


    async function deleteItem(item: Item){
      const confirmDelete = confirm("Are you sure you want to delete this item")

      if(!confirmDelete) return

      const response = await call(`/item/delete/${item.id}`, "DELETE")

      if(response.error) return response.error

      setItems(prevItems => prevItems.filter(curItem => curItem.id !== item.id))
    }

    return (
      <ul className={styles.itemList}>
        {items.map((item: Item) => (
            <li className='flex justify-between' key={item.id}>
                <div>{item?.name}</div>
                <div>{item?.price * item?.quantity}</div>
                <div>{item?.paid ? "Paid" : "Not Paid"}</div>
                <div><button>Edit</button></div>
                <div className="text-right text-red-500 text-xl">
                  <button onClick={() => deleteItem(item)}><FaRegTimesCircle/></button>
                </div>
            </li>
        ))}
      </ul>
  )
}

export default ItemList