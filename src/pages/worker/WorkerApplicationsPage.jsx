import React, { useState, useEffect } from 'react'
import { getMyApplications } from '../../services/applicationService'
import ApplicationList from '../../components/applications/ApplicationList'

function WorkerApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    async function fetchApplications() {
        setLoading(true);
        try {
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>My Applications</h1>
            <ApplicationList applications={applications} viewAs='worker' onUpdate={fetchApplications} />
        </div>
    )
}

export default WorkerApplicationsPage
