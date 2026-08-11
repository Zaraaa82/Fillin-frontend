import React from 'react'
import WorkerApplicationCard from './WorkerApplicationCard'
import { useNavigate } from 'react-router';


function WorkerApplicationList({ applications, onWithdraw, onReapply, onCancel}) {

    const navigate = useNavigate();

    function handleReview(applicationId) {
        navigate(`/applications/${applicationId}/review`);
    }

    return (
        <div className="applications-list">
            {applications.map((application) => (
                <WorkerApplicationCard
                    key={application._id}
                    application={application}
                    onWithdraw={onWithdraw}
                    onReapply={onReapply}
                    onCancel={onCancel}
                    onReview={handleReview}
                />
            ))}
        </div>
    )
}

export default WorkerApplicationList
