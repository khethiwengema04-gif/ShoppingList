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

    // Track the current values from the form inputs
    const { itemList, editingItemId, name, quantity, optionalNote } = useSelector((state: RootState) => state.list)

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

            dispatch(editList({ name, quantity, optionalNote, userId: '', listId: '' }));
        }
    };

    return (
        <div className={style.itemContainer}>
            <ShoppingItem />

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
