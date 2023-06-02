"use client"

import React, { useEffect, useState, useCallback } from 'react'
import styles from "./styles.module.scss"
import ItemForm from '@/components/ItemForm'
import { call } from '@/utils/call'
import { Item } from '@/store/slices/activitySlice'
import ShoppingListItem from '@/components/ShoppingListItem'
import Link from 'next/link'
import ChooseActivityModal from '@/components/Modals/ChooseActivity'
import { useRouter } from 'next/navigation'
import { selectShoppingListSelected,  } from '@/store/slices/shoppingListSelected'
import { useAppSelector } from '@/store/hooks'

const shopping = () => {
  const [items, setItems] = useState<Item[]>([])
  const [showActivityList, setShowActivityList] = useState<boolean>(false)

  const router = useRouter()
  const selectedItems = useAppSelector(selectShoppingListSelected)

  const fetchItems = useCallback(async () => {
    const response = await call("/item/all", "GET")

    if(response.error) return console.log(response.message)

    const itemsNoActivity = response.data.filter((item: Item) => !item.activityId)

    setItems(itemsNoActivity)
  }, [])

  function newActivity(){

    if(selectedItems.length <= 0){
      // TODO: Add error modal
      console.log("You did not select any items")
      return
    }
    router.push("/dashboard/activities/new-activity?withItems=true")


  }

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return (
    <section className={styles.shoppingList}>
        <ChooseActivityModal showModal={showActivityList} setShowModal={setShowActivityList} />
        <h1 className='text-2xl'>Shopping List</h1>
        <div>
          <button className="bg-sky-700 text-white my-2 py-1 px-3 rounded-md" onClick={() => setShowActivityList(true)}>Add To Activity</button>
          <button className="bg-amber-500 text-white m-2 py-1 px-3 rounded-md" onClick={() => newActivity()}>Create Activity</button>
        </div>
        <ItemForm activity={undefined} setItems={setItems}/>
        <ul className={styles.list}>
          {items.map((item: Item) => (
              <ShoppingListItem  item={item} key={item.id} setItems={setItems}/>
          ))}
        </ul>
    </section>
  )
}

export default shopping