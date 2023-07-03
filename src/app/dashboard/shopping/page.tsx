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
import { selectItems } from '@/store/slices/itemSlice'

const shopping = () => {
  const [showActivityList, setShowActivityList] = useState<boolean>(false)
  const [itemsNoActivity, setItemsNoActivity] = useState<Item[]>([])

  const router = useRouter()
  const selectedItems = useAppSelector(selectShoppingListSelected)
  const items = useAppSelector(selectItems)


  function newActivity(){

    if(selectedItems.length <= 0){
      return alert("Please select at least one item.")
    }
    router.push("/dashboard/activities/new-activity?withItems=true")

  }

  useEffect(() => {
    // console.log(items)
    setItemsNoActivity(items.filter(item => !item.activityId))
  }, [])

  return (
    <section className={styles.shoppingList}>
        <ChooseActivityModal showModal={showActivityList} setShowModal={setShowActivityList} />
        <h1 className='text-2xl'>Shopping List</h1>
        <div>
          <button className="bg-sky-700 text-white my-2 py-1 px-3 rounded-md" onClick={() => setShowActivityList(true)}>Add To Activity</button>
          <button className="bg-amber-500 text-white m-2 py-1 px-3 rounded-md" onClick={() => newActivity()}>Create Activity</button>
        </div>
        <ItemForm activity={undefined} setItems={setItemsNoActivity}/>
        <ul className={styles.list}>
          {itemsNoActivity.map((item: Item) => (
              <ShoppingListItem  item={item} key={item.id} setItems={setItemsNoActivity}/>
          ))}
        </ul>
    </section>
  )
}

export default shopping