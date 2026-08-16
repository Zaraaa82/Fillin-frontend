import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import {
  getShiftApplications,
  acceptApplication,
  rejectApplication,
  cancelAssignment,
  updateAttendance
} from '../../services/applicationService';
import BusinessApplicationList from '../../components/applications/BusinessApplicationList';
import { Flex, Spin } from 'antd';



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
   
    async function handleAttendance(applicationId, attendanceStatus) {
        try {
            setError(null);
            await updateAttendance(applicationId, {attendanceStatus});
            await fetchApplications();
        } catch (err) {
            setError(err.message);
        }
    }


  if (loading) {
    return(
      <Flex justify="center" align="center" style={{ height: '50vh' }}>
        <Spin size="large" style={{color: '#14b8a6'}}/>
      </Flex>
    )
  }
    
    return (
        <div className='page-container'>
            <h1 className='page-title'>Shift Applications</h1>
            {error && (<p className="error-message">Error: {error}</p>)}

            {applications.length === 0 ?
                (
                    <p className='empty-state'>No workers have applied to this shift.</p>
                ) : (
                    <BusinessApplicationList
                        applications={applications}
                        onAccept={handleAccept}
                        onReject={handleReject}
                        onCancel={handleCancel}
                        onAttendance={handleAttendance}
                    />
                )}
        </div>
    )
}

export default ShiftApplicationsPage
