
import { ShoppingItem } from '../../ShoppingItem/ShoppingItem'
import style from './List.module.css'
import { ItemCard } from '../../ItemCard/ItemCard'
import type { AppDispatch, RootState } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import {
    getItemListThunk,
    deleteItemList,
    setEditingItem
} from '../../../Features/List'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const List = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { listId } = useParams<{ listId: string }>();

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

    useEffect(() => {
        if (listId && userId) {
            dispatch(getItemListThunk({ userId, listId }));
        }
    }, [dispatch, listId, userId]);

    const { itemList } = useSelector((state: RootState) => state.list);

    return (
        <div className={style.itemContainer}>
            <ShoppingItem />

            {itemList.map((items) => (
                <ItemCard
                    key={items.id}
                    itemlist={items}
                    onEdit={() => dispatch(setEditingItem(items))}
                    onDelete={() => {
                        if (items.id) {
                            dispatch(deleteItemList(items.id));
                        }
                    }}
                />
            ))}
        </div>
    )
}

export default List
