import React from 'react'
import { useState, useEffect } from 'react'
import { getShiftById, cancelShift } from '../../services/shiftService'
import { applyToShift, getMyApplications } from '../../services/applicationService'
import { useParams, useNavigate } from 'react-router'
import { Link } from 'react-router'
import {useAuth} from '../../context/AuthContext'

function ShiftDetailsPage() {
    const [shift, setShift] = useState();
    const [error, setError] = useState("");
    const { shiftId } = useParams();
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [hasApplied, setHasApplied] = useState(false);

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

    async function checkIfApplied() {
        try {
            const myApplications = await getMyApplications();
            setHasApplied(myApplications.some((application) =>
                application.shift._id === shiftId && application.status !== 'withdrawn'
            ));
        } catch (err) {
            setHasApplied(false);
        }
    }

    async function handleDelete() {
        try {
            await cancelShift(shiftId);
            navigate('/shifts');
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleApply() {
        try {
            await applyToShift(shiftId);
            navigate('/applications/me');
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        fetchShift();
        if (user?.role === 'worker') {
            checkIfApplied();
        }
    }, [shiftId, user]);

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
            {user?.role === 'worker' && !hasApplied && (
                <button onClick={handleApply}>Apply</button>
            )}
            {user?.role === 'business' && user._id === shift.postedBy?.owner && (
                <>
                <button onClick={handleDelete}>Delete Shift</button>
                <button onClick={() => navigate(`/shifts/${shiftId}/edit`)}>Edit Shift</button>
                <button onClick={() => navigate(`/shifts/${shiftId}/applications`)}>View Applicants</button>
                </>
            )}
        </div>
    )
}

export default ShiftDetailsPage
