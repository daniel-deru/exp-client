"use client"

import { useEffect, useState } from 'react'
import styles from "./styles.module.scss"
import ItemForm from '@/components/ItemForm'
import { Item } from '@/store/slices/activitySlice'
import ShoppingListItem from '@/components/ShoppingListItem'
import ChooseActivityModal from '@/components/Modals/ChooseActivity'
import { useRouter } from 'next/navigation'
import { selectShoppingListSelected,  } from '@/store/slices/shoppingListSelected'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectItems, setShoppingItems } from '@/store/slices/shoppingItemSlice'
import { call } from '@/utils/call'
import sumItems from '@/utils/calc/sum'

const shopping = () => {
  const [showActivityList, setShowActivityList] = useState<boolean>(false)

  const router = useRouter()
  const dispatch = useAppDispatch()
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

  async function fetchShoppingListItems(){
    const response = await call<Item[]>("/item/all?noActivity=true", "GET")

    if(response.error) {
        alert(response.message)
        return []
    }

    dispatch(setShoppingItems(response.data))
  }

  useEffect(() => {
    if(shoppingItems.length <= 0){
      fetchShoppingListItems()
    }
  }, [])

  return (
    <section className={styles.shoppingList}>

        <ChooseActivityModal showModal={showActivityList} setShowModal={setShowActivityList} />
        <h1 className='text-2xl'>Shopping List</h1>
        <div className='mt-2'>
          <div><b>Total: </b>{sumItems(shoppingItems)}</div>
        </div>
        <div>
          <button className={`${styles.primary} my-2 py-1 px-3 rounded-md`} onClick={() => addToActivity()}>Add To Activity</button>
          <button className={`${styles.secondary} m-2 py-1 px-3 rounded-md`} onClick={() => newActivity()}>Create Activity</button>
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