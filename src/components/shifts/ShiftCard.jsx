import React from 'react'
import { Link } from 'react-router'

function ShiftCard({ shift }) {
    return (
        <div className="shift-card">
            <h2>{shift.title}</h2>
            <p>Status: {shift.status}</p>
            <p>Available Spots: {shift.availableSpots}</p>
            <p>Application Deadline: {new Date(shift.applicationDeadline).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            <Link to={`/shifts/${shift._id}`}>View Details</Link>
        </div>
    )
}

export default ShiftCard
