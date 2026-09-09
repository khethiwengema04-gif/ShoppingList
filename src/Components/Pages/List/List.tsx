import { ShoppingItem } from '../../ShoppingItem/ShoppingItem'
import style from './List.module.css'
import { ItemCard } from '../../ItemCard/ItemCard'
import type { AppDispatch, RootState } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
// 1. ADDED 'editList' to your imports from the feature slice
import { getItemListThunk, deleteItemList, setEditingItem, editList } from '../../../Features/List'
import { useEffect } from 'react'

export const List = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getItemListThunk(''));
    }, [dispatch]);

    // Track the current values from the Redux form inputs
    const { itemList, editingItemId, name, quantity, optionalNote } = useSelector((state: RootState) => state.list)

    // 2. MOVED the conditional logic into an isolated click handler function
    const handleSaveItem = () => {
        if (editingItemId) {
            dispatch(
                editList({
                    id: editingItemId,
                    name,
                    quantity,
                    optionalNote,
                    userId: '',
                    listId: '',
                })
            );
        } else {
            // If you have a separate add/create thunk, it should go here instead of editList
            dispatch(editList({ name, quantity, optionalNote, userId: '', listId: '' })); // Replace with your add thunk if available
        }
    };

    return (
        <div className={style.itemContainer}>
            <ShoppingItem />

            {/* 3. ADDED a save button that calls our new non-crashing click function */}
            <div className={style.formActions}>
                <button type="button" onClick={handleSaveItem}>
                    {editingItemId ? 'Update Item' : 'Add Item'}
                </button>
            </div>

            {itemList.map((items) => (
                <ItemCard
                    key={items.id}
                    itemlist={items}
                    onEdit={() => dispatch(setEditingItem(items))}
                    onDelete={() => {
                        if (items.id) dispatch(deleteItemList(items.id))
                    }}
                />
            ))}
        </div>
    )
}

export default List
