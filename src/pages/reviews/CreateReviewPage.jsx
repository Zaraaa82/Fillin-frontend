import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getApplicationById } from '../../services/applicationService'
import { createReview } from '../../services/reviewService'
import { useAuth } from '../../context/AuthContext'
import ReviewForm from '../../components/reviews/ReviewForm'

function CreateReviewPage() {
    const { applicationId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [application, setApplication] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchApplication() {
            setLoading(true);
            try {
                setApplication(await getApplicationById(applicationId));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchApplication();
    }, [applicationId]);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p className='error'>{error}</p>
    }

    if (application.status !== 'completed' || application.attendanceStatus !== 'attended') {
        return <p>Reviews can only be left once the shift is completed and attendance is confirmed.</p>
    }

    const revieweeName = user?.role === 'business'
        ? application.worker.fullName
        : application.shift.postedBy.name;

    async function handleSubmit({ rating, comment }) {
        await createReview(applicationId, { rating, comment });
        navigate(user?.role === 'business' ? `/shifts/${application.shift._id}/applications` : '/applications/me');
    }

    return (
        <div className='page-container'>
            <div className='form-card'>
                <h2 className='auth-title'>Review {revieweeName}</h2>
                <p className='review-context'>Shift: {application.shift.title}</p>
                <ReviewForm onSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default CreateReviewPage
