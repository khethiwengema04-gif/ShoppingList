
import React, { useState } from 'react';
import styles from './CategoryList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { categoryThunk } from '../../Features/category';
import type { Category } from '../../Features/category';

interface CategoryProps {
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    onSort: () => void;
}

export const CategoryComponent: React.FC<CategoryProps> = ({ onSort }) => {

    const dispatch = useDispatch() as any;

    const user = useSelector((state: RootState) => state.login.user);

    const [categoryName, setCategoryName] = useState<string>('');

    let User = user;

    if (!User) {
        const savedUser = localStorage.getItem('user');

        if (savedUser) {
            User = JSON.parse(savedUser);
        }
    }

    const userId = User?.id ? String(User.id) : '';

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            alert('Please enter a category name');
            return;
        }

        if (!userId) {
            alert('Please log in before adding a category');
            return;
        }

        dispatch(
            categoryThunk({
                userId: userId,
                name: categoryName.trim()
            } as Omit<Category, 'id'>)
        );

        setCategoryName('');
    };

    return (
        <form onSubmit={handleAddCategory}>
            <div className={styles.cardContainer}>

                <h1 className={styles.tittle}>
                    MANAGE CATEGORIES
                </h1>

                <input
                    className={styles.enter}
                    type="text"
                    placeholder="Enter category name..."
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />

                <div className={styles.buttonContainer}>

                    <button
                        className={styles.button}
                        type="submit"
                    >
                        Add Category +
                    </button>

                    <select
                        className={styles.sortByImg}
                        onChange={onSort}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Sort by
                        </option>

                        <option value="name">
                            Category Name
                        </option>

                        <option value="date">
                            Added Date
                        </option>

                    </select>

                </div>

            </div>
        </form>
    );
};

export default CategoryComponent;
