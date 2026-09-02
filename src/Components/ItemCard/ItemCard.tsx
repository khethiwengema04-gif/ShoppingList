import React from 'react'
import style from './ItemCard.module.css'
import { useNavigate } from 'react-router-dom'
import type { ItemList } from '../../Features/List'


interface ItemCardProps {
    itemlist: ItemList;
    onEdit: () => void;
    onDelete: () => void;

}

export const ItemCard = ({ itemlist, onDelete, onEdit }: ItemCardProps) => {


    return (
        <div className={style.itemlistCard}>
            <div className={style.itemlistButton}>
                <h2>{itemlist.name}</h2>
                <h2>{itemlist.quantity}</h2>
                <h2>{itemlist.optionalNote}</h2>

                <button onClick={onEdit} className={style.editButton}  >
                    Edit
                </button>

                <button onClick={onDelete} className={style.deletebutton}  >
                    Delete
                </button>


            </div>

        </div>
    )

}

export default ItemCard