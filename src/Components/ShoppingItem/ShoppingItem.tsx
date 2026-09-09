import React, { useState, useEffect } from 'react'
import style from './ShoppingItem.module.css'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store'
import { ItemListThunk, editList, clearEditingItem, getItemListThunk } from '../../Features/List' // Ensure editList and clearEditingItem are imported
import { useParams } from 'react-router-dom';

export const ShoppingItem: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    // 1. Monitor the global state to see if an item is being edited
    const { editingItemId, itemList = [] } = useSelector((state: RootState) => state.list);

    const { listId } = useParams<{ listId: string }>();
    useEffect(() => {
        if (listId) {
            dispatch(getItemListThunk(listId)); // Fetch items for the specific listId
        }
    }, [listId, dispatch]);

    // Local state variables for form inputs
    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [optionalNote, setOptionalNote] = useState<string>('');

    // 2. Populate form fields automatically when 'Edit' is clicked in the parent list
    useEffect(() => {
        if (editingItemId) {
            const itemToEdit = itemList.find(item => item.id === editingItemId);
            if (itemToEdit) {
                setName(itemToEdit.name || '');
                setQuantity(itemToEdit.quantity || 0);
                setOptionalNote(itemToEdit.optionalNote || '');
            }
        } else {
            // Clear inputs if we are no longer editing
            setName('');
            setQuantity(0);
            setOptionalNote('');
        }
    }, [editingItemId, itemList]);

    // 3. Handle both Creating and Updating on Form Submission
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) return;

        if (editingItemId) {
            // If editingItemId exists, execute the update thunk
            dispatch(
                editList({
                    id: editingItemId,
                    name,
                    userId: '', // You may want to set this dynamically if needed
                    listId: listId || '', // Ensure listId is passed correctly
                    quantity,
                    optionalNote
                })
            );
        } else {
            // Otherwise, add a new item to your list
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

        // Reset the form fields after submission
        setName('');
        setQuantity(0);
        setOptionalNote('');
    };

    return (
        <>
            <form onSubmit={handleFormSubmit} className={style.itemContainer}>
                <div className={style.itemContent}>
                    {/* The title dynamically switches depending on form action state */}
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

                        {/* Optional: Add a cancel button to exit edit mode cleanly */}
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
