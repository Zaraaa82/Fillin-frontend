import React, { useEffect, useState } from 'react';
import {getSkills} from '../../../services/skillService';
import { useAuth } from '../../../context/AuthContext';
import { createProfile, updateProfile } from '../../../services/workerProfileService';
import { useNavigate, useParams } from 'react-router';

export function ProfileForm({ profile }) {
    const {user, setUser} = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    const initialFormData = {
        fullName: '',
        imageURL: '',
        bio: '',
        skills: [],
        location: ''
    }
    const [formdata, setFormData] = useState(initialFormData);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        async function fetchProfile() {
            try {
                if (profile) {
                    setFormData({
                    fullName: profile.fullName ?? '',
                    imageURL: profile.imageURL ?? '',
                    bio: profile.bio ?? '',
                    location: profile.location ?? '',
                    skills: profile.skills?.map((skill) =>
                        typeof skill === 'string' ? skill : skill._id
                    ) ?? []});
                }
                setSkills(await getSkills());
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [profile]);

    async function handleSubmit(event) {
        event.preventDefault();

        if (formdata.skills.length === 0) {
            setError('Please select at least one skill.');
            return;
        }

        try {
            setSending(true);
            setError(null);

            const hasExistingProfile = Boolean(profile);

            if (!hasExistingProfile) {
                await createProfile(formdata);
            } else {
                await updateProfile(formdata);
            }

            setUser((prev) => ({
                ...prev,
                isProfileComplete: true,
            }));

            navigate('/profile/me');
        } catch (err) {
            setError(err.message);
        } finally {
            setSending(false);
        }
    }

    function handleInputChange(event){
        const {name, value} = event.target;
        setFormData({...formdata, [name]: value});
    }

    function handleSkillChange(event){
        const {value, checked} = event.target;
        setFormData({
            ...formdata,
            skills: 
                checked?
                    [...formdata.skills, value]
                : 
                    formdata.skills.filter(skillId=> skillId!==value)
        });
    }

    if(loading){
        return <p>Loading...</p>
    }



  return (
    <div>
        {error && <p className="error-message">Error: {error}</p>}

        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="fullName">Full Name</label>
                <input 
                    type="text"
                    id='fullName'
                    name='fullName'
                    value={formdata.fullName}
                    onChange={handleInputChange}
                    maxLength={100}
                    placeholder='Enter your full name'
                    required
                />
            </div>

            <div className='form-group'>
                <label htmlFor="imageURL">Profile Photo</label>
                <input 
                    type="text"
                    id='imageURL'
                    name='imageURL'
                    value={formdata.imageURL}
                    onChange={handleInputChange}
                    placeholder='https://example.com/photo.jpg'
                />
            </div>

            <div className='form-group'>
                <label htmlFor="bio">Bio</label>
                <textarea 
                    id='bio'
                    name='bio'
                    value={formdata.bio}
                    onChange={handleInputChange}
                    placeholder='Write a short bio about your experience'
                />
            </div>            

            <div className="form-group">
                <label>Skills</label>

                <div className='skills-options'>

                    {skills.map((skill) => (
                    <label key={skill._id} className='skill-option'>
                        <input
                        type="checkbox"
                        name='skills'
                        value={skill._id}
                        checked={formdata.skills.includes(skill._id)}
                        onChange={handleSkillChange}
                    />

                        <span>{skill.name}</span>
                    </label>
                    ))}
                </div>
            </div>

            <div className='form-group'>
                <label htmlFor="location">Location</label>
                <input 
                    type="text"
                    id='location'
                    name='location'
                    value={formdata.location}
                    onChange={handleInputChange}
                    placeholder='City or neighborhood'
                />
            </div>

            <button type='submit' className='btn btn-primary btn-block' disabled={sending}>
                {sending
                    ? (profile ? 'Updating...' : 'Creating...')
                    : (profile ? 'Update' : 'Create')}
            </button>

        </form>
      
    </div>
  )
}

export default ProfileForm
