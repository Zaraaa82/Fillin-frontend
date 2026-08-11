import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import {
  getShiftApplications,
  acceptApplication,
  rejectApplication,
  cancelAssignment,
} from '../../services/applicationService';
import BusinessApplicationList from '../../components/applications/BusinessApplicationList';



function ShiftApplicationsPage() {
    const { shiftId } = useParams();

    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchApplications() {
        try {
            setLoading(true);
            setError(null);
            const response = await getShiftApplications(shiftId);
            setApplications(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, [shiftId]);

    async function handleAccept(applicationId) {
        try {
            setError(null);
            await acceptApplication(
                applicationId,
                { businessMessage:'Your application has been accepted. Please review the shift details and arrive on time.'}
            );
            await fetchApplications();
        
        } catch (err) {
            setError(err.message);
        }
    }

  async function handleReject(applicationId) {
        try {
            setError(null);
            await rejectApplication(
                applicationId,
                {rejectionReason: 'Your application was not selected for this shift.'}
            );
            await fetchApplications();
        
        } catch (err) {
            setError(err.message);
        }
    }

  async function handleCancel(applicationId) {
        try {
            setError(null);
            await cancelAssignment(applicationId);
            await fetchApplications();
        } catch (err) {
            setError(err.message);
        }
    }


    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            <h1>Shift Applications</h1>
            {error && (<p className="error-message">Error: {error}</p>)}

            {applications.length === 0 ? 
                (
                    <p>No workers have applied to this shift.</p>
                ) : (
                    <BusinessApplicationList
                        applications={applications}
                        onAccept={handleAccept}
                        onReject={handleReject}
                        onCancel={handleCancel}
                    />
                )}
        </div>
    )
}

export default ShiftApplicationsPage
