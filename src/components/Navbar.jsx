import { Link, NavLink } from 'react-router'
import { Puzzle, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function navLinkClass({ isActive }) {
  return isActive ? 'nav-link active' : 'nav-link'
}

function Navbar() {
  const { logout, user} = useAuth()
  const initial = user?.username?.[0]?.toUpperCase() ?? '?'

  return (
    <nav className='navbar'>
      <Link to='/' className='navbar-brand'>
        <Puzzle size={22} />
        Fillin
      </Link>

      <div className='navbar-links'>
        <NavLink to='/shifts' className={navLinkClass}>All Shifts</NavLink>
        {user && (
          <>
            <NavLink to='/dashboard' className={navLinkClass}>Dashboard</NavLink>
            <NavLink to='/profile/me' className={navLinkClass}>Profile</NavLink>
            {user.role === 'business' && (
              <>
                <NavLink to='/business/shifts' className={navLinkClass}>My Shifts</NavLink>
                <NavLink to='/shifts/create' className={navLinkClass}>Create Shift</NavLink>
              </>
            )}
            {user.role === 'worker' && (
              <NavLink to='/applications/me' className={navLinkClass}>My Applications</NavLink>
            )}
          </>
        )}
      </div>

      <div className='navbar-actions'>
        {user ? (
          <>
            <span className='navbar-avatar'>{initial}</span>
            <span className='navbar-username'>{user.username}</span>
            <button onClick={logout} className='btn'><LogOut size={16} />Sign Out</button>
          </>
        ) : (
          <>
            <Link to='/sign-in' className='btn'>Sign In</Link>
            <Link to='/sign-up' className='btn'>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar