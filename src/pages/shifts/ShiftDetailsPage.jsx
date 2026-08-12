import React from 'react'
import { useState, useEffect } from 'react'
import { getShiftById, cancelShift } from '../../services/shiftService'
import { applyToShift, getMyApplications } from '../../services/applicationService'
import { useParams, useNavigate } from 'react-router'
import { Link } from 'react-router'
import { MapPin, Calendar, Clock, Wallet, Users, Puzzle } from 'lucide-react'
import {useAuth} from '../../context/AuthContext'

function ShiftDetailsPage() {
    const [shift, setShift] = useState();
    const [error, setError] = useState("");
    const { shiftId } = useParams();
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [hasApplied, setHasApplied] = useState(false);
    const [hasConflict, setHasConflict] = useState(false);

    async function fetchShift() {
        setLoading(true);
        try {
            const response = await getShiftById(shiftId);
            setShift(response);

            if (user?.role === 'worker') {
                await checkApplicationState(response);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function checkApplicationState(currentShift) {
        try {
            const myApplications = await getMyApplications();
            setHasApplied(myApplications.some((application) =>
                application.shift._id === shiftId && application.status !== 'withdrawn'
            ));
            setHasConflict(myApplications.some((application) =>
                application.status === 'accepted' &&
                application.shift._id !== shiftId &&
                new Date(currentShift.startTime) < new Date(application.shift.endTime) &&
                new Date(currentShift.endTime) > new Date(application.shift.startTime)
            ));
        } catch (err) {
            setHasApplied(false);
            setHasConflict(false);
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
    }, [shiftId, user]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    const ownerId = shift.postedBy?.owner?._id ?? shift.postedBy?.owner;
    const isShiftOwner = user?._id?.toString() === ownerId?.toString();

    const isFull = shift.status === 'open' && shift.availableSpots === 0;
    const statusClass = shift.status !== 'open'
        ? 'shift-status-closed'
        : isFull ? 'shift-status-full' : 'shift-status-open';
    const statusLabel = shift.status !== 'open' ? shift.status : (isFull ? 'Full' : 'Open');

    const formatDate = (date) => new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

    return (
        <div>
            <h2>{shift.title}</h2>
            <p>{shift.description}</p>
            <p>Status: {shift.status}</p>
            <p>Required Skills: {shift.requiredSkills.map((skill) => skill.name).join(', ')}</p>
            <p>Pay Rate: {shift.payAmount.toFixed(2)} BHD</p>
            <p>Available Spots: {shift.availableSpots}</p>
            <p>Application Deadline: {new Date(shift.applicationDeadline).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            <p>Start Date: {new Date(shift.startTime).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            <p>End Date: {new Date(shift.endTime).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            <p>Location: {shift.location}</p>
            {user?.role === 'worker' && user.status === 'active' && !hasApplied && !hasConflict && shift.status === 'open' && shift.availableSpots > 0 && (
                <button onClick={handleApply}>Apply</button>
            )}
            {!user && shift.status === 'open' && shift.availableSpots > 0 && (
                <button type="button" onClick={() => navigate('/sign-in')}>Sign in to apply</button>
            )}

            {user?.role === 'worker' && !hasApplied && !hasConflict && shift.status === 'open' && shift.availableSpots === 0 && (
                <p>This shift is full.</p>
            )}
            {user?.role === 'worker' && !hasApplied && !hasConflict && shift.status !== 'open' && (
                <p>This shift is no longer accepting applications.</p>
            )}
            {user?.role === 'worker' && !hasApplied && hasConflict && (
                <p>This shift conflicts with a shift you've already been accepted for.</p>
            )}
            {user?.role === 'business' && isShiftOwner && (
                <>
                {
                    !['cancelled', 'in-progress', 'completed'].includes(shift.status) && (
                        <>
                            <button onClick={handleDelete}>Cancel Shift</button>
                            <button onClick={() => navigate(`/shifts/${shiftId}/edit`)}>Edit Shift</button>
                        </>

                    )
                }
                <button onClick={() => navigate(`/shifts/${shiftId}/applications`)}>View Applicants</button>
                </>
            )}
        </div>
    )
}

export default ShiftDetailsPage
