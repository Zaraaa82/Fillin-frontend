import React, { useState } from 'react'

function ReviewForm({ initialRating = 5, initialComment = '', onSubmit, onCancel, submitLabel = 'Submit Review' }) {
    const [rating, setRating] = useState(initialRating);
    const [comment, setComment] = useState(initialComment);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await onSubmit({ rating: Number(rating), comment });
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='review-form'>
            {error && <p className='error'>{error}</p>}

            <div className='form-group'>
                <label htmlFor='rating'>Rating</label>
                <select
                    id='rating'
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                >
                    {[5, 4, 3, 2, 1].map((value) => (
                        <option key={value} value={value}>{value} out of 5</option>
                    ))}
                </select>
            </div>

            <div className='form-group'>
                <label htmlFor='comment'>Comment</label>
                <textarea
                    id='comment'
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    required
                />
            </div>

            <button type='submit' disabled={submitting}>{submitLabel}</button>
            {onCancel && (
                <button type='button' disabled={submitting} onClick={onCancel}>Cancel</button>
            )}
        </form>
    )
}

export default ReviewForm
