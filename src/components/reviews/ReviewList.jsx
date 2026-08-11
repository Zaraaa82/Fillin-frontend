import React from 'react'
import ReviewCard from './ReviewCard'

function ReviewList({ reviews, onUpdate }) {
    if (reviews.length === 0) {
        return <p>No reviews yet.</p>
    }

    return (
        <div className='review-list'>
            {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} onUpdate={onUpdate} />
            ))}
        </div>
    )
}

export default ReviewList
