import React from 'react'
import { getShiftApplications } from '../../services/applicationService'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router';

function ShiftApplicationsPage() {
    const { shiftId } = useParams();
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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

        fetchApplications();
    }, [shiftId]);

    return (
        <div>
            <h1>Shift Applications</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {applications.map((oneApplicant) => (
                    <li key={oneApplicant._id}>
                        {oneApplicant.worker.fullName} - {oneApplicant.matchPercentage}% match
                        <Link to={`/shifts/${shiftId}`}>View Shift Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ShiftApplicationsPage
