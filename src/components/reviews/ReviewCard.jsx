import React, { useState } from 'react'
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

    return (
        <div className='review-card'>
            {error && <p className='error'>{error}</p>}
            <p className='review-rating'>{review.rating} / 5</p>
            <p className='review-comment'>{review.comment}</p>
            <p className='review-meta'>
                {review.reviewer?.username} · {new Date(review.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </p>

            {isOwner && (
                <div className='review-actions'>
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default ReviewCard
