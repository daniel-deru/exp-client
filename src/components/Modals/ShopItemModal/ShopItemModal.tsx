import React from 'react'
import ModalWrapper from '../ModalWrapper'
import { ItemDetail } from '@/app/dashboard/activities/[id]/start/page'
import styles from "./shopItem.module.scss"
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { selectItems } from '@/store/slices/itemSlice'

interface Props {
    setItemDetail: React.Dispatch<React.SetStateAction<ItemDetail>>
    itemDetail: ItemDetail
}

const ShopItemModal: React.FC<Props> = ({setItemDetail, itemDetail}) => {

    const items = useAppSelector(selectItems)

    console.log(items)
    
    return (
        <ModalWrapper showModal={itemDetail.show}>
            <div className={styles.shopItemModal}>
                <h1 className="text-center mb-3">Enter Details</h1>
                <div>
                    <div>{itemDetail?.item?.name}</div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" name='price'/>
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" name='quantity' defaultValue={1}/>
                    </div>
                </div>
                <button onClick={() => setItemDetail({show: false})}>Complete</button>
            </div>

        </ModalWrapper>
    )
}

export default ShopItemModal