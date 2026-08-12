import React from 'react'
import { Link, Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
} from 'lucide-react'

function LandingPage() {
  const { user } = useAuth()
  return (
    <main>
      <section>
        <div>
          <span>On-demand staffing in Bahrain</span>
          <h1>The right people.<br />Right when you need them.</h1>
          <p>
            Fillin connects reliable workers with local businesses that need extra
            support—quickly, simply, and shift by shift.
          </p>

          <div>
            <Link to='/sign-up'>Get started <ArrowRight size={17} /></Link>
            <Link to='/shifts'>Browse open shifts</Link>
          </div>

          <div>
            <span><CheckCircle2 size={16} />Flexible opportunities</span>
            <span><CheckCircle2 size={16} />Local businesses</span>
            <span><CheckCircle2 size={16} />Simple applications</span>
          </div>
        </div>

        <div>
          <div>
            <div>
              <span><BriefcaseBusiness size={21} /></span>
              <span>Open</span>
            </div>
            <p>Local hospitality team</p>
            <h2>Event Service Crew</h2>
            <div><Clock3 size={16} />Evening shift · 5 hours</div>
            <div>
              <strong>BHD 30.00</strong>
              <span>3 spots left</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LandingPage