import { Link } from 'react-router'
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
} from 'lucide-react'

function LandingPage() {
  return (
    <main className='landing-page'>
      <section className='hero'>
        <div className='hero-content'>
          <span className='hero-label'>On-demand staffing in Bahrain</span>

          <h1 className='hero-title'>The right people. <br/> Right when you need them.</h1>

          <p className='hero-description'>
            Fillin connects reliable workers with local businesses that need
            extra support—quickly, simply, and shift by shift.
          </p>

          <div className='hero-actions'>
            <Link to='/sign-up' className='btn btn-primary'>Get started <ArrowRight size={17}/></Link>
            <Link to='/shifts' className='btn'>Browse open shifts</Link>
          </div>

          <div className='hero-features'>
            <span><CheckCircle2 size={16} />Flexible opportunities</span>
            <span><CheckCircle2 size={16} /> Local businesses</span>
            <span><CheckCircle2 size={16} />Simple applications</span>
          </div>
        </div>

        <div className='hero-image'>
          <div className='shift-card hero-shift-card'>
            <div className='shift-card-header'>
              <span className='shift-icon'><BriefcaseBusiness size={21}/></span>
              <span className='shift-status shift-status-open'>Open</span>
            </div>

            <p className='business-name'>Local hospitality team</p>
            <h2 className='shift-title'>Event Service Crew</h2>
            <div className='shift-meta'><Clock3 size={16}/> Evening shift · 5 hours</div>
            <div className='shift-footer'>
              <strong className='shift-pay'>BHD 30.00</strong>
              <span className='shift-spots'>3 spots left</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LandingPage