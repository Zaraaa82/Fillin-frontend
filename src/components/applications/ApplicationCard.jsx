import React from 'react'
import { Link } from 'react-router'
import ApplicationActions from './ApplicationActions'

function ApplicationCard({ application, viewAs, onUpdate }) {
    return (
        <div>
            {viewAs === 'business' && (
                <>
                    <h3>{application.worker.fullName}</h3>
                    <p>Match: {application.matchPercentage}%</p>
                </>
            )}

            {viewAs === 'worker' && (
                <h3>{application.shift.title}</h3>
            )}

            <p>Status: {application.status}</p>
            {application.attendanceStatus !== 'not-applicable' && (
                <p>Attendance: {application.attendanceStatus}</p>
            )}

            <Link to={`/shifts/${application.shift._id}`}>View Shift Details</Link>
            {application.status !== 'withdrawn' && (
                <Link to={`/applications/${application._id}`}>View Application Details</Link>
            )}

            <ApplicationActions application={application} viewAs={viewAs} onUpdate={onUpdate} />
        </div>
    )
}

export default ApplicationCard
