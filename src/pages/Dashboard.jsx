import { Link } from "react-router"
import { useAuth } from "../context/AuthContext"

function Dashboard({  }) {
  const {user} = useAuth()
  return (
    <div className='page-container'>
        <h1 className='page-title'>Welcome back, {user.username}</h1>
        <p className='dashboard-subtitle'>Here's what you can do next.</p>
        <div className='dashboard-actions'>
          {user.role === 'worker' ? (
            <>
              <Link to='/shifts' className='btn btn-primary'>Browse Shifts</Link>
              <Link to='/applications/me' className='btn'>My Applications</Link>
            </>
          ) : (
            <>
              <Link to='/shifts/create' className='btn btn-primary'>Create Shift</Link>
              <Link to='/business/shifts' className='btn'>My Shifts</Link>
            </>
          )}
        </div>
    </div>
  )
}

export default Dashboard