import React from 'react'
import styles from './CategoryList.module.css'

interface CategoryProps {

    onDelete: (id: number) => void
    onEdit: (id: number) => void
}



export const Category: React.FC<CategoryProps> = ({ }) => {
    return (


        <form >
            <div className={styles.cardContainer}>
                <h1 className={styles.tittle}>CATEGORIES:</h1>

                <input className={styles.enter}
                    type='text'
                    placeholder='addCategory Here'
                />
                <div>

                    <button className={styles.button} onClick={() => { }} >
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
}

export default Category