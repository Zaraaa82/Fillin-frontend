import React, { useState } from 'react'
import { withdrawApplication, acceptApplication,rejectApplication,cancelAssignment,updateAttendance} from '../../services/applicationService'

function ApplicationActions({ application, viewAs, onUpdate }) {
    const [rejecting, setRejecting] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);

    async function runAction(action) {
        setSending(true);
        setError('');
        try {
            await action();
            onUpdate();
        } catch (err) {
            setError(err.message);
        } finally {
            setSending(false);
        }
    }

    async function handleReject(event) {
        event.preventDefault();
        await runAction(() => rejectApplication(application._id, { rejectionReason }));
        setRejecting(false);
        setRejectionReason('');
    }

    return (
        <div>

            {viewAs === 'worker' && application.status === 'pending' && (
                <button disabled={sending} onClick={() => runAction(() => withdrawApplication(application._id))}>
                    Withdraw
                </button>
            )}

            {viewAs === 'worker' && application.status === 'accepted' && (
                <button disabled={sending} onClick={() => runAction(() => cancelAssignment(application._id))}>
                    Cancel Assignment
                </button>
            )}

            {viewAs === 'business' && application.status === 'pending' && !rejecting && (
                <>
                    <button disabled={sending} onClick={() => runAction(() => acceptApplication(application._id, {}))}>
                        Accept
                    </button>
                    <button disabled={sending} onClick={() => setRejecting(true)}>
                        Reject
                    </button>
                </>
            )}

            {viewAs === 'business' && application.status === 'pending' && rejecting && (
                <form onSubmit={handleReject}>
                    <label htmlFor='rejectionReason'>Rejection Reason</label>
                    <input
                        type='text'
                        id='rejectionReason'
                        value={rejectionReason}
                        onChange={(event) => setRejectionReason(event.target.value)}
                        required
                    />
                    <button type='submit' disabled={sending}>Submit</button>
                    <button type='button' disabled={sending} onClick={() => setRejecting(false)}>Cancel</button>
                </form>
            )}

            {viewAs === 'business' && application.status === 'accepted' && application.shift.status === 'completed' && (
                <>
                    <button disabled={sending} onClick={() => runAction(() => updateAttendance(application._id, { attendanceStatus: 'attended' }))}>
                        Mark Attended
                    </button>
                    <button disabled={sending} onClick={() => runAction(() => updateAttendance(application._id, { attendanceStatus: 'missed' }))}>
                        Mark Missed
                    </button>
                </>
            )}
        </div>
    )
}

export default ApplicationActions
