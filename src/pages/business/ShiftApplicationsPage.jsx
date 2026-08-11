import React from 'react'
import { getShiftApplications } from '../../services/applicationService'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import ApplicationList from '../../components/applications/ApplicationList'

function ShiftApplicationsPage() {
    const { shiftId } = useParams();
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function fetchApplications() {
        setLoading(true);
        try {
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Shift Applications</h1>
            <ApplicationList applications={applications} viewAs='business' onUpdate={fetchApplications} />
        </div>
    )
}

export default ShiftApplicationsPage
