import { Item } from '@/store/slices/activitySlice'
import React from 'react'
import styles from "./styles.module.scss"


interface Props {
    items: Item[]
}

const ItemList: React.FC<Props> = ({ items }) => {
  return (
    <ul className={styles.itemList}>
    {items.map((item: Item) => (
        <li className='flex justify-between'>
            <div>{item?.name}</div>
            <div>{item?.price * item?.quantity}</div>
            <div>{item?.paid ? "Paid" : "Not Paid"}</div>
            <div><button>Edit</button></div>
        </li>
    ))}
</ul>
  )
}

export default ItemList