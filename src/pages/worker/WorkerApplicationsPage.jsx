import React, { useState, useEffect } from 'react'
import { getMyApplications, withdrawApplication, applyToShift, cancelAssignment} from '../../services/applicationService';
import WorkerApplicationList from '../../components/applications/WorkerApplicationList';
function WorkerApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchApplications() {
        setLoading(true);
        try {
            setError(null);
            const response = await getMyApplications();
            setApplications(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, []);

    async function handleWithdraw(applicationId){
        try{
            setError(null);
            await withdrawApplication(applicationId);
            await fetchApplications();
        }catch(err){
            setError(err.message);
        }
    }

    async function handleReapply(shiftId){
        try{
            setError(null);
            await applyToShift(shiftId);
            await fetchApplications();
        }catch(err){
            setError(err.message);
        }
    }

    async function handleCancel(applicationId){
        try{
            setError(null);
            await cancelAssignment(applicationId);
            await fetchApplications();
        }catch(err){
            setError(err.message);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="applications-page">
            <h1>My Applications</h1>
            {error && (<p className="error-message">Error: {error}</p>)}
            
            {applications.length === 0? 
                <p>You have not applied to any shifts yet.</p>
            : (
                <WorkerApplicationList
                    applications={applications}
                    onWithdraw={handleWithdraw}
                    onReapply={handleReapply}
                    onCancel={handleCancel}
                />
            )
            }
        </main>
    )
}

export default WorkerApplicationsPage
