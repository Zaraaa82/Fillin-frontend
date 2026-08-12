import React from 'react'
import { Link } from 'react-router'
import { MapPin, Calendar  } from 'lucide-react'

function ShiftCard({ shift }) {
    const isFull = shift.status === 'open' && shift.availableSpots === 0;
    const statusClass = shift.status !== 'open'
        ? 'shift-status-closed'
        : isFull ? 'shift-status-full' : 'shift-status-open';
    const statusLabel = shift.status !== 'open' ? shift.status : (isFull ? 'Full' : 'Open');

    return (
        <div className="shift-card">
            <div className='shift-card-header'>
                <h2 className='shift-title'>{shift.title}</h2>
                <span className={`shift-status ${statusClass}`}>{statusLabel}</span>
            </div>

            <div className='shift-meta'>
                <MapPin size={14} />
                {shift.location}
            </div>
            <div className='shift-meta'>
                <Calendar size={14} />
                Apply by {new Date(shift.applicationDeadline).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </div>

            <div className='shift-footer'>
                <span className='shift-pay'>${shift.payAmount.toFixed(2)}</span>
                <span className='shift-spots'>{shift.availableSpots} spots left</span>
            </div>

            <Link to={`/shifts/${shift._id}`} className='btn btn-block'>View Details</Link>
        </div>
    )
}

export default ShiftCard
