
import style from './Card.module.css'
import type { Category } from '../../Features/category'


interface CardProps {
    category: Category;
    onView: () => void;
    onDelete: () => void;
}

// export const Navbar: React.FC<CardProps> = ({ }) => {
//     const navigate = useNavigate()
//     const handleSettingsClick = () => {
//         navigate('/itemList')



export const Card = ({ category, onView, onDelete }: CardProps) => {
    return (
        <div className={style.categoryCard}>
            <div className={style.categoryButton}>
                <h2>{category.name}</h2>

                <button onClick={onView} className={style.viewButton}  >
                    View
                </button>

                <button onClick={onDelete} className={style.deletebutton}  >
                    Delete
                </button>


            </div>

        </div>
    )
}
