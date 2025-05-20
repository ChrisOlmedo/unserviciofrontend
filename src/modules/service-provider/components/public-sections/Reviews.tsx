import styles from './Reviews.module.css';

interface Review {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

interface ReviewsProps {
    reviews: Review[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
    const renderStars = (rating: number) => {
        return Array(5).fill(0).map((_, index) => (
            <span key={index} className={index < rating ? styles.starFilled : styles.starEmpty}>
                ★
            </span>
        ));
    };

    return (
        <div className={styles.reviewsContainer}>
            {reviews && reviews.length > 0 ? (
                <div className={styles.reviewsList}>
                    {reviews.map((review) => (
                        <div key={review.id} className={styles.reviewCard}>
                            <div className={styles.reviewHeader}>
                                <div className={styles.userInfo}>
                                    <span className={styles.userName}>{review.author}</span>
                                    <div className={styles.rating}>
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                                <span className={styles.reviewDate}>{review.date}</span>
                            </div>
                            <p className={styles.reviewComment}>{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <span className={styles.emptyStateIcon}>⭐</span>
                    <p className={styles.emptyStateText}>
                        Aún no hay reseñas. ¡Sé el primero en dejar tu opinión!
                    </p>
                </div>
            )}

        </div>
    );
};

export default Reviews; 