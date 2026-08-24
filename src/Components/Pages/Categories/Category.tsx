import React from 'react'
import styles from './Categories.module.css'

interface CategoryProps {

    onDelete: (id: number) => void
    onEdit: (id: number) => void
}



export const Category: React.FC<CategoryProps> = ({ }) => {
    return (


        <div>
            <h1 className={styles.tittle}>CATEGORIES:</h1>


            <button className={styles.button} onClick={() => { }}>
                Delete
            </button>

            <button className={styles.button} onClick={() => { }} >
                Edit
            </button>
        </div>

    )
}

export default Category