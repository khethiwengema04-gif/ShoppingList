import React from 'react'
import style from './List.module.css'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../store'
import { AddName, AddQuantity, AddOptionalnote, ItemListThunk } from '../../../Features/List'
import { useParams } from 'react-router-dom';

// interface ListProps {

//     onDelete: (id: number) => void
//     onEdit: (id: number) => void
//     onClick: (id: number) => void

// }

export const List: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { name, quantity, optionalNote, itemList = [] } = useSelector((state: RootState) => state.list);
    const { listId } = useParams<{ listId: string }>();

    const handleAddList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!name.trim()) return;
        dispatch(
            ItemListThunk({
                name,
                quantity,
                optionalNote
            })

        )

    }

    return (
        <div className={style.pageWrapper}>
            <form onSubmit={handleAddList} className={style.itemContainer}>
                <div className={style.itemContainer}>
                    <div className={style.itemContent}>
                        <h1>Shopping Items (List ID: {listId})</h1>

                        <input className={style.name}
                            type="text"
                            placeholder='item name'
                            value={name}
                            onChange={(e) => dispatch(AddName(e.target.value))} />

                        <input className={style.quantity}
                            type="number"
                            placeholder='0'
                            value={quantity}
                            onChange={(e) => dispatch(AddQuantity(Number(e.target.value)))} />

                        <input className={style.optional}
                            type="text"
                            placeholder='optional note'
                            value={optionalNote}
                            onChange={(e) => dispatch(AddOptionalnote(e.target.value))} />

                        <button type="submit" className={style.button}>
                            Add+
                        </button>
                    </div>
                </div>
            </form>


            <div className={style.cardsContainer}>
                {itemList.length === 0 ? (
                    <p className={style.emptyState}>No items added yet.</p>
                ) : (
                    itemList.map((item: any, index: number) => (
                        <div key={item.id || index} className={style.itemCard}>
                            <div className={style.cardHeader}>
                                <h3 className={style.cardName}>{item.name}</h3>
                                <span className={style.cardQuantity}>Qty: {item.quantity}</span>
                            </div>
                            {item.optionalNote && (
                                <p className={style.cardNote}>📝 {item.optionalNote}</p>
                            )}
                        </div>
                    ))
                )}

            </div>
        </div>
    )
}

