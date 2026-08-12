import React, { useEffect, useState } from 'react'
import { Briefcase, Globe, Mail, Phone, User, Star, Building2, Pencil } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router';
import { getBusinessReviews } from '../../../services/reviewService';
import ReviewList from '../../reviews/ReviewList';

export function Profile({ profile }) {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    async function fetchReviews() {
        if (!profile?._id) return;
        try {
            setReviews(await getBusinessReviews(profile._id));
        } catch {
            setReviews([]);
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [profile?._id]);

    if (!profile) {
      return <div>No business profile found.</div>
    }
    const ownerId = profile.owner._id;
    const isOwner = user?._id?.toString() === ownerId.toString();
    const status = isOwner? user?.status : profile.owner.status;
    const email = isOwner? user.email : profile.owner.email;
    const phoneNumber = isOwner? user.phoneNumber : profile.owner.phoneNumber;



  return (
    <main className="profile-page">
        <section className="profile-header">
            <section className="profile-info">
                <div className='profile-photo-wrap'>
                    <img src={profile.imageURL} alt={`${profile.name}'s profile`} className='profile-photo' />
                    {status !== 'suspended' && <span className='profile-online-dot'></span>}
                </div>
                <div className="profile-details">
                    <h1 className="profile-fullName">{profile.name}</h1>
                    {profile.industry && <p className='profile-location'><Briefcase size={16} />{profile.industry}</p>}
                    { status && (<p className='profile-user-status'>{status}</p>)}
                    {isOwner && (<button onClick={() => navigate('/profile/form')} className="btn"><Pencil size={16} />Edit Profile</button>)}
                </div>
            </section>
            <section className="profile-summary">
                <div className='profile-statistic'>
                    <span className='profile-statistic-icon icon-amber'><Star size={20} /></span>
                    <span className='profile-statistic-value'>{(profile.avgRating ?? 0).toFixed(1)}/5</span>
                    <span className='profile-statistic-label'>Average Rating</span>
                </div>
            </section>
        </section>
        <div className="profile-layout">
            <div className="profile-main">
                <section className="profile-about">
                    <div className='card-heading'><User size={18} /><h3>About</h3></div>
                    <p>{profile.description}</p>
                </section>

                <section className='profile-reviews'>
                    <div className='card-heading'><Star size={18} /><h3>Reviews</h3></div>
                    <ReviewList reviews={reviews} onUpdate={fetchReviews} />
                </section>
            </div>
            <aside className="profile-sidebar">
                <section className="profile-contact-info">
                    <div className='card-heading'><Building2 size={18} /><h3>Business Information</h3></div>
                    {profile.industry !== 'other' &&(
                        <div className="contact-container">
                            <div className='contact-left'>
                                <Briefcase size={16} />
                                <div className='contact-text'>
                                    <span className="contact-label">Industry</span>
                                </div>
                            </div>
                            <div className='contact-right'>
                                <span className="contact-value">{profile.industry}</span>
                            </div>
                        </div>
                    )}
                    {profile.websiteURL && (
                        <div className="contact-container">
                            <div className='contact-left'>
                                <Globe size={16} />
                                <div className='contact-text'>
                                    <span className="contact-label">Website</span>
                                </div>
                            </div>
                            <div className='contact-right'>
                                <a
                                    href={profile.websiteURL}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="contact-value"
                                >
                                    Visit website
                                </a>
                            </div>
                        </div>
                    )}
                </section>

                <section className="profile-contact-info">
                    <div className='card-heading'><Phone size={18} /><h3>Contact Information</h3></div>
                    <div className='contact-container'>
                        <div className='contact-left'>
                            <Mail size={16} />
                            <div className='contact-text'>
                                <span className='contact-label'>Email</span>
                            </div>
                        </div>
                        <div className='contact-right'>
                            <span className='contact-value'>{email}</span>
                        </div>
                    </div>
                    <div className='contact-container'>
                        <div className='contact-left'>
                            <Phone size={16} />
                            <div className='contact-text'>
                                <span className='contact-label'>Phone</span>
                            </div>
                        </div>
                        <div className='contact-right'>
                            <span className='contact-value'>{phoneNumber}</span>
                        </div>
                    </div>
                </section>
            </aside>
        </div>

    </main>
  )
}

export default Profile
