import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getApplicationById } from '../../services/applicationService'
import { useAuth } from '../../context/AuthContext'
import ApplicationActions from '../../components/applications/ApplicationActions'

function ApplicationDetailsPage() {
    const { applicationId } = useParams();
    const { user } = useAuth();
    const [application, setApplication] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    async function fetchApplication() {
        setLoading(true);
        try {
            const response = await getApplicationById(applicationId);
            setApplication(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchApplication();
    }, [applicationId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const viewAs = user?.role === 'business' ? 'business' : 'worker';

    return (
        <div>
            <h2>{application.shift.title}</h2>
            <p>Location: {application.shift.location}</p>
            <p>Pay Rate: ${application.shift.payAmount.toFixed(2)}</p>
            <p>Start Date: {new Date(application.shift.startTime).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            <p>End Date: {new Date(application.shift.endTime).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>

            {viewAs === 'business' && (
                <>
                    <p>Applicant: {application.worker.fullName}</p>
                    <p>Skill Match: {application.matchPercentage}%</p>
                </>
            )}

            {viewAs === 'worker' && (
                <p>Business: {application.shift.postedBy.name}</p>
            )}

            <p>Status: {application.status}</p>
            {application.attendanceStatus !== 'not-applicable' && (
                <p>Attendance: {application.attendanceStatus}</p>
            )}
            {application.status === 'rejected' && (
                <p>Rejection Reason: {application.rejectionReason}</p>
            )}
            {application.businessMessage && (
                <p>Message from Business: {application.businessMessage}</p>
            )}

            <ApplicationActions application={application} viewAs={viewAs} onUpdate={fetchApplication} />
        </div>
    )
}

export default ApplicationDetailsPage
