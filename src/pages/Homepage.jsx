import React from 'react'
import { Link } from 'react-router'

function Homepage() {
  return (
    <main className='homepage-hero'>
      <div className='homepage-hero-content'>
        <h1 className='homepage-title'>Find shifts. Fill shifts. Get paid.</h1>
        <p className='homepage-subtitle'>Fillin connects reliable workers with businesses that need extra hands, fast.</p>
        <div className='homepage-actions'>
          <Link to='/shifts' className='btn btn-primary'>Browse Shifts</Link>
          <Link to='/sign-up' className='btn'>Sign Up</Link>
        </div>
      </div>
    </main>
  )
}

export default Homepage