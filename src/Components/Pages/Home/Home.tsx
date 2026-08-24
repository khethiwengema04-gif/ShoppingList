import React from 'react'
import Navbar from '../../Navbar/Navbar'
import styles from './Home.module.css'
import { Search } from '../Search/Search'
// import type { CategoryList } from '../Home/


interface CategoryListProps {

    onDelete: (id: number) => void
    onEdit: (id: number) => void
}



export const Home: React.FC<CategoryListProps> = ({ }) => {
    return (
        <div>
            <Navbar />
            <Search />
            <div>
                <h1 className={styles.tittle}>CATEGORIES:</h1>


                <button className={styles.button} onClick={() => { }}>
                    Delete
                </button>

                <button className={styles.button} onClick={() => { }} >
                    Edit
                </button>
            </div>
        </div>
    )

}
