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

      <div className='navbar-links'>

        {
          !user && (
            <>
            <Link to='/' className='navbar-brand'>
              <Puzzle size={22} />
              Fillin
            </Link> 
            <NavLink to='/shifts' className={navLinkClass}>All Shifts</NavLink>
            </>
          )
        }

        {
          user && !user.isProfileComplete && (
            <NavLink to='/profile/form' className={navLinkClass}>Create Profile</NavLink>
          )
        }

        {
          user?.isProfileComplete && user.role === 'worker' && (
            <>
              <Link to='/business/shifts' className='navbar-brand'>
                <Puzzle size={22} />
                Fillin
              </Link>  
              <NavLink to='/shifts' className={navLinkClass}>All Shifts</NavLink>
              <NavLink to='/applications/me' className={navLinkClass}>My Applications</NavLink>
            </>
          )
        }

        {
          user?.isProfileComplete && user.role === 'business' && (
            <>
              <Link to='/shifts' className='navbar-brand'>
                <Puzzle size={22} />
                Fillin
              </Link>  
              <NavLink to='/business/shifts' className={navLinkClass}>My Shifts</NavLink>
              <NavLink to='/shifts/create' className={navLinkClass}>Create Shift</NavLink>
            </>
          )
        }
        
      </div>

      <div className='navbar-actions'>
        {user ? (
          <>
            <NavLink to='/profile/me' className='navbar-user'>
              <span className='navbar-avatar'>{initial}</span>
              <span className='navbar-username'>{user.username}</span>
            </NavLink>
            
            <button onClick={logout} className='btn sign-out'><LogOut size={16} /></button>
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