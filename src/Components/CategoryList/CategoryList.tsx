import React from 'react'
import styles from './CategoryList.module.css'

interface CategoryProps {

    onDelete: (id: number) => void
    onEdit: (id: number) => void
}



export const Category: React.FC<CategoryProps> = ({ }) => {
    return (


        <div>
            <h1 className={styles.tittle}>CATEGORIES:</h1>
            <div>
                <h2 className={styles.category}>Fruits</h2>
                <button className={styles.button} onClick={() => { }} >
                    View
                </button>

                <button className={styles.button} onClick={() => { }}>
                    Delete
                </button>

            </div>



            <div>
                <h2 className={styles.category}>Cosmetics</h2>
                <button className={styles.button} onClick={() => { }} >
                    View
                </button>

                <button className={styles.button} onClick={() => { }}>
                    Delete
                </button>

            </div>



            <div>
                <h2 className={styles.category}>Beef</h2>
                <button className={styles.button} onClick={() => { }} >
                    View
                </button>

                <button className={styles.button} onClick={() => { }}>
                    Delete
                </button>

            </div>



            <div>
                <h2 className={styles.category}>Backery</h2>
                <button className={styles.button} onClick={() => { }} >
                    View
                </button>

                <button className={styles.button} onClick={() => { }}>
                    Delete
                </button>

            </div>








        </div>

    )
}

export default Category