
import style from './Card.module.css'
import type { Category } from '../../Features/category'
import { useNavigate } from 'react-router-dom';


interface CardProps {
    category: Category;
    onView: () => void;
    onDelete: () => void;
}


export const Card = ({ category, onView, onDelete }: CardProps) => {
    const navigate = useNavigate()
    const handleSubmitClick = () => {
        navigate('/view')
    }
    return (
        <div className={style.categoryCard}>
            <div className={style.categoryButton}>
                <h2>{category.name}</h2>

                <button onClick={handleSubmitClick} className={style.viewButton}  >
                    View
                </button>

                <button onClick={onDelete} className={style.deletebutton}  >
                    Delete
                </button>


            </div>

        </div>
    )
}

