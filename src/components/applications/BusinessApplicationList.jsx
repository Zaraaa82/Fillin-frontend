import BusinessApplicationCard from './BusinessApplicationCard';
import { useNavigate } from 'react-router';


function BusinessApplicationList({ applications, onAccept, onReject, onCancel, onAttendance}) {
    const navigate = useNavigate();

    function handleReview(applicationId) {
        navigate(`/applications/${applicationId}/review`);
    }

    return (
        <div className="applications-list">
            {applications.map((application) => (
                <BusinessApplicationCard
                    key={application._id}
                    application={application}
                    onAccept={onAccept}
                    onReject={onReject}
                    onCancel={onCancel}
                    onReview={handleReview}
                    onAttendance={onAttendance}
                />
            ))}
        </div>
    )
}

export default BusinessApplicationList
