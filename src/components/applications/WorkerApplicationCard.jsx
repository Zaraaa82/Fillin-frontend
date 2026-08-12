import { useNavigate } from 'react-router';

function WorkerApplicationCard({  application, onWithdraw, onReapply, onCancel, onReview}) {
  const navigate = useNavigate();
  const { shift, status } = application;

  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div className="application-card worker-application-card">
      <div className="application-card-header">
        <div>
          <p className="business-name">{shift.postedBy?.name}</p>
          <h2>{shift.title}</h2>
        </div>

        <span className={`status-badge status-${status}`}>{status}</span>
      </div>

      <div className="application-card-details">
        <p><strong>Date:</strong> {formatDate(shift.startTime)}</p>
        <p><strong>Time:</strong> {formatTime(shift.startTime)} -  {formatTime(shift.endTime)}</p>
        <p><strong>Location:</strong> {shift.location}</p>
        <p><strong>Pay:</strong> {shift.payAmount} BHD</p>
      </div>

      {status === 'rejected' && application.rejectionReason && (
        <p className="application-rejection-reason"><strong>Rejection reason:</strong> {application.rejectionReason}</p>
      )}

      {status === 'accepted' && application.businessMessage && (
        <p className="application-business-message"><strong>Message from business:</strong> {application.businessMessage}</p>
      )}

      <div className="application-card-actions">
        <button className="btn" onClick={() => navigate(`/shifts/${shift._id}`)}>View Shift</button>

        {status === 'pending' && (
          <button type="button" className="btn btn-danger" onClick={() => onWithdraw(application._id)}>Withdraw</button>
        )}

        {status === 'accepted' && (
            <button type="button" className="btn btn-danger" onClick={() => onCancel(application._id)}>Cancel assignment</button>
        )}

        {status === 'withdrawn' && shift.status === 'open' && (
            <button type="button" className="btn" onClick={() => onReapply(shift._id)}>Reapply</button>
        )}

        {status === 'completed' && (
            <button type="button" className="btn btn-primary" onClick={() => onReview(application._id)}>Review Business</button>
        )}
      </div>
    </div>
  );
}

export default WorkerApplicationCard;