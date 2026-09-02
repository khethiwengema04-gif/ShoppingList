
import style from './Card.module.css'
import { type Category } from '../../Features/category'
import { useNavigate } from 'react-router-dom';
import deleteCategory from '../../Features/category';
import { type AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';


export const useAppDispatch = () => useDispatch<AppDispatch>();

interface CardProps {
    category: Category;
    onView: () => void;
    onDelete: () => void;
}


export const Card = ({ category, onDelete }: CardProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmitClick = () => {
        navigate(`/list/${category.id}`);
    }
    // const handleDelete = () => {
    //     dispatch(deleteCategory(category.id));
    // }
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

