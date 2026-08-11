import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { logout, user} = useAuth()
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/shifts'>All Shifts</Link>
      {user
      ?
      (<>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/profile/me'>Profile</Link>


      <button onClick={logout}>Sign Out</button>
      {user.role === 'business' && (
        <>
        <Link to='/business/shifts'>My Shifts</Link>
        <Link to='/shifts/create'>Create Shift</Link>
        </>
      )}
      {user.role === 'worker' && (
        <Link to='/applications/me'>My Applications</Link>
      )}
      </>) :
      (<>
        <Link to='/sign-up'>Sign Up</Link>
        <Link to='/sign-in'>Sign In</Link>
      </>)}
    </nav>
  )
}

export default Navbar