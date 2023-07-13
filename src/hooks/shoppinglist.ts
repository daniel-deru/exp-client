import { useState, useEffect, useCallback, Dispatch, SetStateAction } from "react"
import { call } from "@/utils/call"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Item } from "@/store/slices/shoppingItemSlice"
import { selectItems, setShoppingItems } from "@/store/slices/shoppingItemSlice"


export default function useShoppingList(): [Item[],  Dispatch<SetStateAction<Item[]>>]{
    const [localShoppingList, setLocalShoppingList] = useState<Item[]>([])

    const shoppingListItems = useAppSelector(selectItems)
    const dispatch = useAppDispatch()

    const fetchShoppingList = useCallback(async () => {
        const response = await call<Item[]>("/item/all?noActivity=true", "GET")

        if(response.error) {
            alert(response.message)
            return []
        }

        dispatch(setShoppingItems(response.data))
        setLocalShoppingList(response.data)
    }, [])

    useEffect(() => {
       
        if(shoppingListItems.length <= 0){
            fetchShoppingList()
        }
        else {
            setLocalShoppingList(shoppingListItems)
        }
    }, [fetchShoppingList])

    return [localShoppingList, setLocalShoppingList]
}