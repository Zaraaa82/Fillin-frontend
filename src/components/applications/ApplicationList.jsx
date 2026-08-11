import React from 'react'
import ApplicationCard from './ApplicationCard'

function ApplicationList({ applications, viewAs, onUpdate }) {
    if (applications.length === 0) {
        return <p>No applications found !</p>
    }

    return (
        <div>
            {applications.map((application) => (
                <ApplicationCard
                    key={application._id}
                    application={application}
                    viewAs={viewAs}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    )
}

export default ApplicationList
