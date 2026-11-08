import React, { useState, useEffect } from 'react'
import style from './ShoppingItem.module.css'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store'
import { ItemListThunk, editList, clearEditingItem, getItemListThunk } from '../../Features/List' // Ensure editList and clearEditingItem are imported
import { useParams } from 'react-router-dom';

export const ShoppingItem: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();


    const { editingItemId, itemList = [] } = useSelector((state: RootState) => state.list);

    const { listId } = useParams<{ listId: string }>();
    useEffect(() => {
        if (listId) {
            dispatch(getItemListThunk(listId));
        }
    }, [listId, dispatch]);


    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [optionalNote, setOptionalNote] = useState<string>('');

    useEffect(() => {
        if (editingItemId) {
            const itemToEdit = itemList.find(item => item.id === editingItemId);
            if (itemToEdit) {
                setName(itemToEdit.name || '');
                setQuantity(itemToEdit.quantity || 0);
                setOptionalNote(itemToEdit.optionalNote || '');
            }
        } else {

            setName('');
            setQuantity(0);
            setOptionalNote('');
        }
    }, [editingItemId, itemList]);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) return;

        if (editingItemId) {

            dispatch(
                editList({
                    id: editingItemId,
                    name,
                    userId: '',
                    listId: listId || '',
                    quantity,
                    optionalNote
                })
            );
        } else {

            dispatch(
                ItemListThunk({
                    name,
                    userId: '',
                    listId: listId || '',
                    quantity,
                    optionalNote
                })
            );
        }


        setName('');
        setQuantity(0);
        setOptionalNote('');
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className={style.itemContainer}>
                <div className={style.itemContent}>

                    <h1>{editingItemId ? 'Edit Shopping Item' : 'Add Shopping Item'} (List ID: {listId})</h1>

                    <input
                        className={style.name}
                        type="text"
                        placeholder='item name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className={style.quantity}
                        type="number"
                        placeholder='0'
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />

                    <input
                        className={style.optional}
                        type="text"
                        placeholder='optional note'
                        value={optionalNote}
                        onChange={(e) => setOptionalNote(e.target.value)}
                    />

                    <div className={style.buttonGroup}>
                        <button type="submit" className={style.button}>
                            {editingItemId ? 'Save Changes' : 'Add+'}
                        </button>


                        {editingItemId && (
                            <button
                                type="button"
                                className={style.cancelButton}
                                onClick={() => dispatch(clearEditingItem())}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </>
    );
};
