
import styles from './Card.module.css'
import type { Category } from '../../Features/category'
import { useNavigate } from 'react-router-dom'
import type { MouseEvent } from 'react'

interface CardProps {
    category: Category;
    itemCount: number;
    onView: () => void;
    onDelete: () => void;
    onShare: () => void;
}

export const Card = ({ category, itemCount, onDelete }: CardProps) => {

    const navigate = useNavigate();

    const handleSubmitClick = () => {
        navigate(`/list/${category.id}`);
    }

    const handleSubmitClickShare = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        const shareUrl = `${window.location.origin}/shared-list/${category.id}`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: category.name,
                    text: `Check out my shopping list: ${category.name}`,
                    url: shareUrl,
                });
            } else {
                await navigator.clipboard.writeText(shareUrl);
                alert('Link copied to clipboard!');
            }
        } catch (error) {
            console.log('Share cancelled', error);
        }
    }

    return (
        <div className={styles.categoryCard}>
            <div className={styles.categoryContent}>
                <h2 className={styles.categoryTitle}>
                    {category.name}
                </h2>

                <p className={styles.itemCount}>
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>

                <div className={styles.buttonContainer}>
                    <button
                        type="button"
                        onClick={handleSubmitClick}
                        className={styles.viewButton}
                    >
                        View
                    </button>

                    <button
                        type="button"
                        onClick={onDelete}
                        className={styles.deleteButton}
                    >
                        Delete
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmitClickShare}
                        className={styles.shareButton}
                    >
                        Share
                    </button>
                </div>
            </div>
        </div>
    )
}
