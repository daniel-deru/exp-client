"use client"

import React, { useEffect, useState, useCallback } from 'react'
import styles from "./styles.module.scss"
import ItemForm from '@/components/ItemForm'
import { Item } from '@/store/slices/activitySlice'
import ShoppingListItem from '@/components/ShoppingListItem'
import ChooseActivityModal from '@/components/Modals/ChooseActivity'
import { useRouter } from 'next/navigation'
import { selectShoppingListSelected,  } from '@/store/slices/shoppingListSelected'
import { useAppSelector } from '@/store/hooks'
import { selectItems } from '@/store/slices/shoppingItemSlice'

const shopping = () => {
  const [showActivityList, setShowActivityList] = useState<boolean>(false)

  const router = useRouter()
  const selectedItems = useAppSelector(selectShoppingListSelected)
  const shoppingItems = useAppSelector(selectItems)


  function newActivity(){

    if(selectedItems.length <= 0){
     
      return alert("Please select at least one shopping item.")
    }
    router.push("/dashboard/activities/new-activity?withItems=true")

  }

  function addToActivity(){

    if(selectedItems.length <= 0){
      return alert("Please select at least one shopping item.")
    }

    setShowActivityList(true)
  }

  return (
    <section className={styles.shoppingList}>

        <ChooseActivityModal showModal={showActivityList} setShowModal={setShowActivityList} />

        <h1 className='text-2xl'>Shopping List</h1>

        <div>
          <button className="bg-sky-700 text-white my-2 py-1 px-3 rounded-md" onClick={() => addToActivity()}>Add To Activity</button>
          <button className="bg-amber-500 text-white m-2 py-1 px-3 rounded-md" onClick={() => newActivity()}>Create Activity</button>
        </div>

        <ItemForm />

        <ul className={styles.list}>
          {shoppingItems.map((item: Item) => (
              <ShoppingListItem  item={item} key={item.id} />
          ))}
        </ul>

    </section>
  )
}

export default shopping