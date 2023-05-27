"use client"

import React from 'react'
import styles from "./styles.module.scss"
import ItemForm from '@/components/ItemForm'
import ItemList from '@/components/ItemList'

const shopping = () => {
  return (
    <section className={styles.shoppingList}>
        <h1 className='text-2xl'>Shopping List</h1>
        <ItemForm activity={undefined}/>
        <ItemList items={[]}/>
    </section>
  )
}

export default shopping