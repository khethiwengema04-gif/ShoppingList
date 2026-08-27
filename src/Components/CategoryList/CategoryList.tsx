import React, { useState } from 'react'
import styles from './CategoryList.module.css'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { categorySlice, categoryThunk } from '../../Features/category'
import type { Category } from '../../Features/category'



interface CategoryProps {

    onDelete: (id: number) => void
    onEdit: (id: number) => void
}



export const CategoryComponent: React.FC<CategoryProps> = () => {
    const dispatch = useDispatch() as any;
    const category = useSelector((state: RootState) => state.category);
    const user = useSelector((state: RootState) => state.login.user)
    const [categoryName, setCategoryName] = useState<string>('');


    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            alert('faka yi category name');
            return;
        }

        dispatch(categoryThunk({ userId: user?.id, name: categoryName } as Omit<Category, "id">))
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
                <div>

                    <button className={styles.button} onClick={handleAddCategory} >
                        Add+
                    </button>
                    {/* 
                    <button className={styles.button} onClick={() => { }}>
                        Delete
                    </button> */}

                </div>

            </div>


        </form>

    )

};
export default CategoryComponent