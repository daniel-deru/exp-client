import React, { useRef } from 'react'
import ModalWrapper from '../ModalWrapper'
import { ItemDetail } from '@/app/dashboard/activities/[id]/start/page'
import styles from "./shopItem.module.scss"

interface Props {
    setItemDetail: React.Dispatch<React.SetStateAction<ItemDetail>>
    itemDetail: ItemDetail,
    updateItems: React.Dispatch<React.SetStateAction<any[]>>
}

const ShopItemModal: React.FC<Props> = ({ setItemDetail, itemDetail, updateItems }) => {

    const quantityRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)

    function update(){
        const price = priceRef?.current?.value
        const quantity = quantityRef?.current?.value

        if(!price || !quantity) return

        updateItems(prevItems => {
            const itemIndex = prevItems.findIndex(item => item.itemId === itemDetail?.item?.id)
            
            
            if(itemIndex < 0) return [...prevItems, {...itemDetail.item, price, quantity}]

            prevItems[itemIndex] = {...itemDetail.item, price, quantity}
            return [...prevItems]            
        })

        setItemDetail({show: false})
        
    }
    
    return (
        <ModalWrapper showModal={itemDetail.show}>
            <div className={styles.shopItemModal}>
                <h1 className="text-center mb-3">Enter Details</h1>
                <div>
                    <div>{itemDetail?.item?.name}</div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name='price' ref={priceRef} autoFocus/>
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" name='quantity' defaultValue={1} ref={quantityRef}/>
                    </div>
                </div>
                <button onClick={() => update()}>Complete</button>
            </div>

        </ModalWrapper>
    )
}

export default ShopItemModal