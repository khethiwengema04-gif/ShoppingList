import React from 'react'
import style from './ItemList.module.css'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store'
import { AddName, AddQuantity, AddOptionalnote, AddItemList, ItemListThunk } from '../../Features/List'




export const ItemList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { name, quantity, optionalNote } = useSelector((state: RootState) => state.list);
    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(ItemListThunk({ name, quantity, optionalNote }));
    };

    return (
        <form onSubmit={handleSave} className={style.itemContainer}>
            <div className={style.itemContainer}>
                <div className={style.itemContent}>
                    <h1>Shopping Items</h1>

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



                    <button className={style.addBtn} onClick={() => handleSave}>
                        +Add Button
                    </button>
                </div>
            </div>
        </form>
    )
}
