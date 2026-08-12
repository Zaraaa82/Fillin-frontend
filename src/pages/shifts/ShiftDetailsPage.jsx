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

    const isFull = shift.status === 'open' && shift.availableSpots === 0;
    const statusClass = shift.status !== 'open'
        ? 'shift-status-closed'
        : isFull ? 'shift-status-full' : 'shift-status-open';
    const statusLabel = shift.status !== 'open' ? shift.status : (isFull ? 'Full' : 'Open');

    const formatDate = (date) => new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

    return (
        <div className='page-container'>
            <div className='shift-details-card'>
                <div className='shift-details-header'>
                    <h1 className='shift-details-title'>{shift.title}</h1>
                    <span className={`shift-status ${statusClass}`}>{statusLabel}</span>
                </div>

                <p className='shift-description'>{shift.description}</p>

                <div className='shift-details-grid'>
                    <div className='shift-meta'><MapPin size={16} />{shift.location}</div>
                    <div className='shift-meta'><Wallet size={16} />${shift.payAmount.toFixed(2)}</div>
                    <div className='shift-meta'><Calendar size={16} />Starts {formatDate(shift.startTime)}</div>
                    <div className='shift-meta'><Calendar size={16} />Ends {formatDate(shift.endTime)}</div>
                    <div className='shift-meta'><Clock size={16} />Apply by {formatDate(shift.applicationDeadline)}</div>
                    <div className='shift-meta'><Users size={16} />{shift.availableSpots} spots left</div>
                </div>

                <div className='shift-skills'>
                    <div className='card-heading'><Puzzle size={18} /><h3>Required Skills</h3></div>
                    <div className='skills-container'>
                        {shift.requiredSkills.map((skill) => (
                            <span key={skill._id} className='skill-badge'>{skill.name}</span>
                        ))}
                    </div>
                </div>

                {user?.role === 'worker' && !hasApplied && !hasConflict && shift.status === 'open' && shift.availableSpots > 0 && (
                    <button onClick={handleApply} className='btn btn-primary'>Apply</button>
                )}
                {user?.role === 'worker' && !hasApplied && !hasConflict && shift.status === 'open' && shift.availableSpots === 0 && (
                    <p className='shift-note'>This shift is full.</p>
                )}
                {user?.role === 'worker' && !hasApplied && !hasConflict && shift.status !== 'open' && (
                    <p className='shift-note'>This shift is no longer accepting applications.</p>
                )}
                {user?.role === 'worker' && !hasApplied && hasConflict && (
                    <p className='shift-note'>This shift conflicts with a shift you've already been accepted for.</p>
                )}
                {user?.role === 'business' && user._id === shift.postedBy?.owner && (
                    <div className='shift-actions'>
                        <button onClick={() => navigate(`/shifts/${shiftId}/edit`)} className='btn'>Edit Shift</button>
                        <button onClick={() => navigate(`/shifts/${shiftId}/applications`)} className='btn'>View Applicants</button>
                        <button onClick={handleDelete} className='btn btn-danger'>Delete Shift</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShiftDetailsPage
