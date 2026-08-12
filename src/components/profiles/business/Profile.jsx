import React, { useEffect, useState } from 'react'
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
                <img src={profile.imageURL} alt={`${profile.name}'s profile`} className='profile-photo' />
                <div className="profile-details">
                    <h1 className="profile-fullName">{profile.name}</h1>
                    { status && (<p className='profile-user-status'>{status}</p>)}
                    {isOwner && (<button onClick={() => navigate('/profile/form')} className="btn">Edit Profile</button>)}
                </div>
            </section>
        </section>
        <div className="profile-layout">
            <div className="profile-main">
                <section className="profile-about">
                    <h3>About</h3>
                    <p>{profile.description}</p>
                </section>

                <section className='profile-reviews'>
                    <h3>Reviews</h3>
                    <ReviewList reviews={reviews} onUpdate={fetchReviews} />
                </section>
            </div>
            <aside className="profile-sidebar">
                <section className="profile-contact-info">
                    <h3>Business Information</h3>
                    {profile.industry !== 'other' &&(
                        <div className="contact-container">
                            <span className="contact-label">Industry</span>
                            <span className="contact-info"> {profile.industry}</span>
                        </div>
                    )}
                    {profile.websiteURL && (
                        <div className="contact-container">
                            <span className="contact-label">Website</span>
                            <a
                                href={profile.websiteURL}
                                target="_blank"
                                rel="noreferrer"
                                className="contact-info"
                            >
                                Visit website
                            </a>
                        </div>
                    )}
                    <section className="profile-contact-info">
                        <h3>Contact Information</h3>
                        <div className='contact-container'>
                            <span className='contact-label'>Email</span>
                            <span className='contact-info'>{email}</span>
                        </div>
                        <div className='contact-container'>
                            <span className='contact-label'>Phone</span>
                            <span className='contact-info'>{phoneNumber}</span>
                        </div>
                    </section>

                </section>
            </aside>
        </div>

    </main>
  )
}

export default Profile
