import { ShoppingItem } from '../../ShoppingItem/ShoppingItem'
import style from './List.module.css'
import { ItemCard } from '../../ItemCard/ItemCard'
import type { AppDispatch, RootState } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { getItemListThunk, deleteItemList, setEditingItem, editList } from '../../../Features/List'


export const List = () => {
    const useAppDispatch = () => useDispatch<AppDispatch>();

    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(getItemListThunk(''));
    // }, [dispatch]);

    const { itemList, editingItemId, name, quantity, optionalNote } = useSelector((state: RootState) => state.list)

    if (editingItemId) {
        dispatch(
            editList({
                id: editingItemId,
                name,
                quantity,
                optionalNote,
            })
        );
    } else {
        dispatch(editList({ name, quantity, optionalNote }));
    }

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
                    }} />
            ))}
        </div>
    )
}

export default List