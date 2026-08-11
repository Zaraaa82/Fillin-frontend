import React from 'react'
import { useState, useEffect } from 'react'
import { getShiftById } from '../../services/shiftService'
import { useParams } from 'react-router'

function ShiftDetailsPage() {
    const [shift, setShift] = useState();
    const [error, setError] = useState("");
    const { shiftId } = useParams();
    const [loading, setLoading] = useState(true);

    async function fetchShift() {
        setLoading(true);
        try {
            const response = await getShiftById(shiftId);
            setShift(response);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchShift();
    }, [shiftId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{shift.title}</h2>
            <p>{shift.description}</p>
            <p>Status: {shift.status}</p>
            <p>Required Skills: {shift.requiredSkills.map((skill) => skill.name).join(', ')}</p>
            <p>Pay Rate: ${shift.payAmount.toFixed(2)}</p>
            <p>Available Spots: {shift.availableSpots}</p>
            <p>Application Deadline: {new Date(shift.applicationDeadline).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            <p>Start Date: {new Date(shift.startTime).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            <p>End Date: {new Date(shift.endTime).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            <p>Location: {shift.location}</p>
        </div>
    )
}

export default ShiftDetailsPage
