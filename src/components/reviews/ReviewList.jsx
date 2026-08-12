import React from 'react'
import { Star } from 'lucide-react'
import ReviewCard from './ReviewCard'

function ReviewList({ reviews, onUpdate }) {
    if (reviews.length === 0) {
        return <p className='reviews-empty'>No reviews yet.</p>
    }

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    return (
        <div className='review-list'>
            <div className='review-summary'>
                <span className='review-summary-score'>{avgRating.toFixed(1)}</span>
                <div className='review-summary-stars'>
                    {[1, 2, 3, 4, 5].map(n => (
                        <Star key={n} size={16} fill={n <= Math.round(avgRating) ? 'currentColor' : 'none'} />
                    ))}
                </div>
                <span className='review-summary-count'>({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
            </div>
            {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} onUpdate={onUpdate} />
            ))}
        </div>
    )
}

export default ReviewList
