
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
    // onEdit: () => void;
    onShare: () => void;
}


export const Card = ({ category, onDelete, onShare }: CardProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmitClick = () => {
        navigate(`/list/${category.id}`);
    }
    // const handleSubmitClickShare = () => {
    //     navigate(`/share/${category.id}`);
    // }

    const handleSubmitClickShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        const shareUrl = `${window.location.origin}/shared-list/${category.id}`
        try {
            if (navigator.share) {
                await navigator.share({
                    title: category.name,
                    text: `Check out my shopping list: ${category.name}`,
                    url: shareUrl,
                })
            } else {
                await navigator.clipboard.writeText(shareUrl)
                alert('Link copied to clipboard!')
            }
        } catch (error) {
            console.log('Share cancelled', error)
        }
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
                <button onClick={handleSubmitClickShare} className={style.shareButton}  >
                    Share
                </button>


            </div>

        </div>
    )
}

