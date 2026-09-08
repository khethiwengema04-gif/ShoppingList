import React, { useState } from 'react'
import styles from './CategoryList.module.css'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { categoryThunk } from '../../Features/category'
import type { Category } from '../../Features/category'
import SortBy from '../../Assets/SortBy.png'



interface CategoryProps {
    onDelete: (id: number) => void
    onEdit: (id: number) => void
    // onShare: (id: number) => void
}


export const CategoryComponent: React.FC<CategoryProps> = () => {
    const dispatch = useDispatch() as any;

    // const category = useSelector((state: RootState) => state.category);
    const user = useSelector((state: RootState) => state.login.user)
    const [categoryName, setCategoryName] = useState<string>('');

    let User = useSelector((state: RootState) => state.login.user);
    if (!user) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) User = JSON.parse(savedUser);
    }

    const userId = User?.id ? String(User.id) : "";

    // useEffect(() => {
    //     if (userId.trim() !== '') {
    //         dispatch(getCategory(userId));
    //     }
    // }, [dispatch, userId]);


    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            alert('Please enter a category name');
            return;
        }

        dispatch(categoryThunk({ userId: userId, name: categoryName } as Omit<Category, "id">))
    };



    return (


        <form >
            <div className={styles.cardContainer}>
                <h1 className={styles.tittle}>CATEGORIES:</h1>

                <input className={styles.enter}
                    type='text'
                    placeholder='addCategory Here'
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <div className={styles.buttonContainer}>

                    <button className={styles.button} onClick={handleAddCategory} >
                        Add+
                    </button>
                    {/* <button className={styles.button} onClick={handleShareCategory} >
                        Share
                    </button> */}
                    <img src={SortBy} alt='Sort by' className={styles.sortByImg} />




                </div>

            </div>


        </form>

    )

};
export default CategoryComponent