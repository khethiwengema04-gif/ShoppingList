
import React, { useState, useEffect } from 'react'
import style from './ShoppingItem.module.css'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store'
import {
    ItemListThunk,
    editList,
    clearEditingItem
} from '../../Features/List'
import { useParams, useNavigate } from 'react-router-dom';

export const ShoppingItem: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { editingItemId, itemList = [] } = useSelector(
        (state: RootState) => state.list
    );

    const reduxUser = useSelector((state: RootState) => state.login.user);

    let savedUser = null;

    try {
        const storedUser = localStorage.getItem('user');
        savedUser = storedUser ? JSON.parse(storedUser) : null;
    } catch {
        savedUser = null;
    }

    const currentUser = reduxUser || savedUser;
    const userId = currentUser?.id ? String(currentUser.id) : '';

    const { listId } = useParams<{ listId: string }>();

    const [name, setName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [optionalNote, setOptionalNote] = useState<string>('');

    useEffect(() => {
        if (editingItemId) {
            const itemToEdit = itemList.find(
                item => item.id === editingItemId
            );

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

        if (!name.trim()) {
            alert('Please enter an item name');
            return;
        }

        if (!userId || !listId) {
            alert('Please log in and select a category first');
            return;
        }

        if (editingItemId) {
            const itemToEdit = itemList.find(
                item => item.id === editingItemId
            );

            if (!itemToEdit) {
                alert('Item could not be found');
                return;
            }

            dispatch(editList({
                id: editingItemId,
                name: name.trim(),
                userId: itemToEdit.userId,
                listId: itemToEdit.listId,
                quantity,
                optionalNote
            }));
        } else {
            dispatch(ItemListThunk({
                name: name.trim(),
                userId,
                listId,
                quantity,
                optionalNote
            }));
        }

        setName('');
        setQuantity(0);
        setOptionalNote('');
    };

    return (
        <>
            <button
                type="button"
                className={style.backButton}
                onClick={() => navigate('/home')}
            >
                ← Back to Categories
            </button>

            <form onSubmit={handleFormSubmit} className={style.itemContainer}>
                <div className={style.itemContent}>
                    <h1>
                        {editingItemId ? 'Edit Shopping Item' : 'Add Shopping Item'}
                    </h1>

                    <input
                        className={style.name}
                        type="text"
                        placeholder="item name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className={style.quantity}
                        type="number"
                        placeholder="0"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />

                    <input
                        className={style.optional}
                        type="text"
                        placeholder="optional note"
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
