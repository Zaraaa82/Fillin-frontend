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
        navigate(`/applications/${applicationId}`);
    }

    return (
        <div>
            <h2>Review {revieweeName}</h2>
            <p>Shift: {application.shift.title}</p>
            <ReviewForm onSubmit={handleSubmit} />
        </div>
    )
}

export default CreateReviewPage
