import { useNavigate } from 'react-router';

function BusinessApplicationCard({
  application,
  onAccept,
  onReject,
  onCancel,
  onReview,
  onAttendance
}) {
  const navigate = useNavigate();
  const { worker, status, attendanceStatus  } = application;

  return (
    <div className="application-card business-application-card">
      <div className="application-card-header">
        <div className="worker-summary">
          <img src={worker.imageURL} alt={`${worker.fullName}'s profile`} className="worker-image"/>

          <div><h2>{worker.fullName}</h2>
            <p className='applied-for'>Applied for: {application.shift?.title}</p>
          </div>
        </div>

        <span className={`status-badge status-${status}`}>{status}</span>
      </div>

      <div className="worker-statistics">
        <div>
          <span>Rating</span>
          <strong>
            {worker.avgRating? `${worker.avgRating} / 5`: 'No ratings'}
          </strong>
        </div>

        <div>
          <span>Reliability</span>
          <strong>{worker.reliabilityPercentage ?? 100}%</strong>
        </div>

        <div>
          <span>Completed shifts</span>
          <strong>{worker.completedShifts ?? 0}</strong>
        </div>

          <div>
            <span>Skill match</span>
            <strong>{application.matchPercentage ?? 0}%</strong>
          </div>
      </div>

      <div className="worker-skills">
        <h3>Skills</h3>

        <div className="skill-list">
          {worker.skills?.map((skill) => (
            <span key={skill._id} className="skill-tag">
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      <div className="application-card-actions">
        <button type="button" className="btn" onClick={() => navigate(`/profile/worker/${worker._id}`)}>View profile</button>

        {status === 'pending' && (
          <>
            <button type="button" className="btn btn-primary" onClick={() => onAccept(application._id)}>Accept</button>
            <button type="button" className="btn btn-danger" onClick={() => onReject(application._id)}>Reject</button>
          </>
        )}

        {status === 'accepted' && application.shift?.status !== 'completed' && (
            <button type="button"  onClick={() => onCancel(application._id)}>Cancel assignment</button>
        )}

        {status === 'completed' && attendanceStatus === 'attended' && (
            <button type="button" onClick={() => onReview(application._id)}>Review Worker</button>
        )}

        {status === 'accepted' &&  application.shift?.status === 'completed' && (
            <>
                <button type="button" onClick={() => onAttendance(application._id, 'attended')}>Attended</button>
                <button type="button" onClick={() => onAttendance(application._id, 'missed')}>Missed</button>
            </>
        )}


      </div>
    </div>
  );
}

export default BusinessApplicationCard;