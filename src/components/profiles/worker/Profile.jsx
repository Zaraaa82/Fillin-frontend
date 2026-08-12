import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router';
import { getWorkerReviews } from '../../../services/reviewService';
import ReviewList from '../../reviews/ReviewList';


function Profile({ profile }) {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    async function fetchReviews() {
        if (!profile?._id) return;
        try {
            setReviews(await getWorkerReviews(profile._id));
        } catch {
            setReviews([]);
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [profile?._id]);

    if (!profile) {
      return <div>No Worker profile found.</div>
    }


    const ownerId = profile.owner?._id ?? profile.owner;
    const isOwner = user?._id === ownerId;

    const status = isOwner? user?.status : profile.owner?.status;

    const email = isOwner? user.email : profile.owner?.email;

    const phoneNumber = isOwner? user.phoneNumber : profile.owner?.phoneNumber;

  return (
    <main className="profile-page">
    <section className="profile-header">
        <section className="profile-info">
            
            <img src={profile.imageURL} alt={`${profile.fullName}'s profile`} className='profile-photo'/>

            <div className='profile-details'>
                
                <h1 className='profile-fullName'>{profile.fullName}</h1>
                <p className='profile-location'>{profile.location}</p>
                { status && (<p className='profile-user-status'>{status}</p>)}
                {isOwner && (
                    <>
                        {user.status === 'suspended' && user.suspendedUntil && (
                            <p>Suspended until: {
                                    new Date(user.suspendedUntil).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })
                                }
                            </p>
                        )}
                        <button onClick={()=>navigate('/profile/form')} className='btn'>Edit Profile</button>
                    </>
                )}
            

            </div>
        </section>
        <section className="profile-summary">

            <div className='profile-statistic'>
                <span></span>
                <span>{profile.completedShifts?? 0}</span>
                <span>Completed Shifts</span>
            </div>

            <div className='profile-statistic'>
                <span></span>
                <span>{profile.avgRating?? 0}/5</span>
                <span>Average Rating</span>
            </div>

            <div className='profile-statistic'>
                <span></span>
                <span>{profile.reliabilityPercentage?? 0}%</span>
                <span>Reliability</span>
            </div>
            
        </section>
    </section>

    <div className="profile-layout">
        <div className="profile-main">
            <section className='profile-about'>
                <h3>About</h3>
                <p>{profile.bio}</p>
            </section>
            <section className='profile-skills'>
                <h3>Skills</h3>
                <div className='skills-container'>
                    {
                        profile.skills.map(skill => 
                            <span key={skill._id} className='skill-badge'>{skill.name}</span>
                        )
                    }
                </div>
            </section>

            <section className='profile-reviews'>
                <h3>Reviews</h3>
                <ReviewList reviews={reviews} onUpdate={fetchReviews} />
            </section>

        </div>

        <aside className="profile-sidebar">
            <section className='profile-contact-info'>
                <h3>Contact Information</h3>
                <div className='contact-container'>
                    <span className='contact-label'>Email</span>
                    <span className='contact-info'>{email}</span>
                </div>
                { 
                    (user.role === 'business' || isOwner) && phoneNumber && (
                        <div className='contact-container'>
                            <span className='contact-label'>Phone</span>
                            <span className='contact-info'>{phoneNumber}</span>
                        </div>
                    )
                }

            </section>
        </aside>
    </div>
    </main>
  )
}

export default Profile
