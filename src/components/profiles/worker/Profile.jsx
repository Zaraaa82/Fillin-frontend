import React, { useEffect, useState } from 'react';
import { MapPin, Briefcase, Star, CheckCircle, User, Puzzle, Phone, Mail, Eye, EyeOff, Pencil } from 'lucide-react';
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

    const canSeeContact = isOwner || user?.role === 'business';

  return (
    <main className="profile-page">
    <section className="profile-header">
        <section className="profile-info">
            
            <div className='profile-photo-wrap'>
                <img src={profile.imageURL} alt={`${profile.fullName}'s profile`} className='profile-photo'/>
                {status !== 'suspended' && <span className='profile-online-dot'></span>}
            </div>

            <div className='profile-details'>

                <h1 className='profile-fullName'>{profile.fullName}</h1>
                <p className='profile-location'><MapPin size={16} />{profile.location}</p>
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
                        <button onClick={()=>navigate('/profile/form')} className='btn'><Pencil size={16} />Edit Profile</button>
                    </>
                )}
            

            </div>
        </section>
        <section className="profile-summary">

            <div className='profile-statistic'>
                <span className='profile-statistic-icon icon-blue'><Briefcase size={20} /></span>
                <span className='profile-statistic-value'>{profile.completedShifts?? 0}</span>
                <span className='profile-statistic-label'>Completed Shifts</span>
            </div>

            <div className='profile-statistic'>
                <span className='profile-statistic-icon icon-amber'><Star size={20} /></span>
                <span className='profile-statistic-value'>{profile.avgRating?? 0}/5</span>
                <span className='profile-statistic-label'>Average Rating</span>
            </div>

            <div className='profile-statistic'>
                <span className='profile-statistic-icon icon-green'><CheckCircle size={20} /></span>
                <span className='profile-statistic-value'>{profile.reliabilityPercentage?? 0}%</span>
                <span className='profile-statistic-label'>Reliability</span>
            </div>
            
        </section>
    </section>

    <div className="profile-layout">
        <div className="profile-main">
            <section className='profile-about'>
                <div className='card-heading'><User size={18} /><h3>About</h3></div>
                <p>{profile.bio}</p>
            </section>
            <section className='profile-skills'>
                <div className='card-heading'><Puzzle size={18} /><h3>Skills</h3></div>
                <div className='skills-container'>
                    {
                        profile.skills.map(skill => 
                            <span key={skill._id} className='skill-badge'>{skill.name}</span>
                        )
                    }
                </div>
            </section>

            <section className='profile-reviews'>
                <div className='card-heading'><Star size={18} /><h3>Reviews</h3></div>
                <ReviewList reviews={reviews} onUpdate={fetchReviews} />
            </section>

        </div>

        <aside className="profile-sidebar">
            <section className='profile-contact-info'>
                <div className='card-heading'><Phone size={18} /><h3>Contact Information</h3></div>
                <div className='contact-container'>
                    <div className='contact-left'>
                        <Mail size={16} />
                        <div className='contact-text'>
                            <span className='contact-label'>Email</span>
                            <span className='contact-sublabel'>Only shared after a shift is accepted</span>
                        </div>
                    </div>
                    <div className='contact-right'>
                        {canSeeContact && email ? (
                            <>
                                <span className='contact-value'>{email}</span>
                                <Eye size={16} />
                            </>
                        ) : (
                            <>
                                <span className='contact-value contact-value-private'>Private</span>
                                <EyeOff size={16} />
                            </>
                        )}
                    </div>
                </div>
                <div className='contact-container'>
                    <div className='contact-left'>
                        <Phone size={16} />
                        <div className='contact-text'>
                            <span className='contact-label'>Phone</span>
                            <span className='contact-sublabel'>Only shared after a shift is accepted</span>
                        </div>
                    </div>
                    <div className='contact-right'>
                        {canSeeContact && phoneNumber ? (
                            <>
                                <span className='contact-value'>{phoneNumber}</span>
                                <Eye size={16} />
                            </>
                        ) : (
                            <>
                                <span className='contact-value contact-value-private'>Private</span>
                                <EyeOff size={16} />
                            </>
                        )}
                    </div>
                </div>

            </section>
        </aside>
    </div>
    </main>
  )
}

export default Profile
