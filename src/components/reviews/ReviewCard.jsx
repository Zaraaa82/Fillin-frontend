import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { updateReview, deleteReview } from '../../services/reviewService'
import ReviewForm from './ReviewForm'

function ReviewCard({ review, onUpdate }) {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState('');

    const isOwner = user?._id === review.reviewer?._id;

    async function handleEdit({ rating, comment }) {
        await updateReview(review._id, { rating, comment });
        setEditing(false);
        onUpdate();
    }

    async function handleDelete() {
        setError('');
        try {
            await deleteReview(review._id);
            onUpdate();
        } catch (err) {
            setError(err.message);
        }
    }

    if (editing) {
        return (
            <div className='review-card'>
                <ReviewForm
                    initialRating={review.rating}
                    initialComment={review.comment}
                    onSubmit={handleEdit}
                    onCancel={() => setEditing(false)}
                    submitLabel='Save'
                />
            </div>
        )
    }

    const initial = review.reviewer?.username?.[0]?.toUpperCase() ?? '?';

    return (
        <div className='review-card'>
            {error && <p className='error'>{error}</p>}
            <div className='review-card-header'>
                <span className='review-avatar'>{initial}</span>
                <div className='review-card-meta'>
                    <span className='review-reviewer'>{review.reviewer?.username}</span>
                    <span className='review-date'>
                        {new Date(review.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </span>
                </div>
                <span className='review-rating-badge'>{review.rating} <Star size={12} fill='currentColor' /></span>
            </div>
            <p className='review-comment'>{review.comment}</p>

            {isOwner && (
                <div className='review-actions'>
                    <button className='btn' onClick={() => setEditing(true)}>Edit</button>
                    <button className='btn' onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default ReviewCard
