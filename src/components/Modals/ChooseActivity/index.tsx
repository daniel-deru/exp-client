import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { Activity, Item, selectActivities } from '@/store/slices/activitySlice'
import { call } from '@/utils/call'
import { deleteShoppingItem } from '@/store/slices/shoppingItemSlice'
import { addItems, deleteActivity, addActivity } from '@/store/slices/activitySlice'

import ModalWrapper from '../ModalWrapper'
import { selectShoppingListSelected, clearSelected } from '@/store/slices/shoppingListSelected'

interface Props {
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}


const ChooseActivityModal: React.FC<Props> = ({ showModal, setShowModal }) => {

    const [selectedActivity, setSelectedActivity] = useState<Activity>()

    const dispatch = useAppDispatch()

    const activities = useAppSelector(selectActivities)
    const selectedItems = useAppSelector(selectShoppingListSelected)


    async function addToActivity(): Promise<void> {

        if(!selectedActivity) return

        const activityId = selectedActivity.id

        const serverItems = await callAddToActivity(selectedItems, activityId)

        for(let item of serverItems){
            dispatch(deleteShoppingItem(item))
        }

        dispatch(deleteActivity(selectedActivity))
        dispatch(addActivity({...selectedActivity, items: [...selectedItems, ...selectedActivity.items]}))

        dispatch(clearSelected())
        setShowModal(false)
        setSelectedActivity(undefined)
    }

    async function callAddToActivity(items: Item[], activityId: string, fItems: Item[] = []){
        if(items.length <= 0) return fItems

        const item = items[0]

        if(!item) return fItems

        const response = await call<Item>(`/item/edit/${item.id}`, "PATCH", { activityId })

        if(!response.error) fItems.push(response.data)
        if(response.error) alert(response.message)

        return callAddToActivity(items.slice(1, items.length), activityId, fItems)
    }

    return (
        <ModalWrapper showModal={showModal}>
            <div className="w-1/2 mx-auto rounded-lg bg-white my-20 p-4">
                <h1 className="text-center">Please Choose An Activity</h1>
                <div>
                    {activities.map((activity: Activity, index: number) => (
                        <div 
                            key={activity.id}
                            className={`flex justify-between p-1 my-3 rounded-md shadow shadow-slate-300 hover:cursor-pointer ${activity.id === selectedActivity?.id ? "bg-sky-300" : ""}`}
                            onClick={() => setSelectedActivity(activity)}    
                        >
                            <div className='w-1/3 truncate'>{activity.name}</div>
                            <div className='w-1/3'>{activity.venue}</div>
                            <div className='w-1/3'>{activity.datePlanned && new Date(activity.datePlanned).toDateString()}</div>
                        </div>
                    ))}
                </div>
                <button className="bg-sky-500 text-white rounded-md py-1 px-3 mx-auto block my-3" onClick={() => addToActivity()}>Select</button>
            </div>
        </ModalWrapper>
    )
}

export default ChooseActivityModal