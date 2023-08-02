import { Item } from "@/store/slices/activitySlice";

// Sum the price and quantity of a list of items
const sumItems = (items: Item[]): string => {
    let total: number = 0
    let allItems: boolean = true

    for(let item of items) {
        if(item.price === null) allItems = false
        else total += (item.price * item.quantity)
    }

    if(allItems) return `${total}`
    else return `More Than ${total}`
} 

export default sumItems