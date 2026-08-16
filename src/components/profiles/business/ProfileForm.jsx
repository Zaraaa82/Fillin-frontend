import React, { useEffect, useState } from 'react';
import { createProfile, updateProfile } from '../../../services/businessProfileService';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router';
import { Flex, Spin } from 'antd';


function ProfileForm({ profile }) {
  const {user, setUser} = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const initialForm = {
    name: '',
    industry: '',
    imageURL: '',
    description: '',
    websiteURL: ''
  };
  const [formdata, setFormData] = useState(initialForm);

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (profile) {
          setFormData({
            name: profile.name ?? '',
            industry: profile.industry ?? '',
            imageURL: profile.imageURL ?? '',
            description: profile.description ?? '',
            websiteURL: profile.websiteURL ?? '',
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [profile]);
  
  const hasExistingProfile = Boolean(profile);
  async function handleSubmit(event){
    event.preventDefault();
    try{
      setSending(true);
      setError(null);

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


    }catch(err){
      setError(err.message);
    }finally{
      setSending(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  if (loading) {
    return(
      <Flex justify="center" align="center" style={{ height: '50vh' }}>
        <Spin size="large" style={{color: '#14b8a6'}}/>
      </Flex>
    )
  }


  return (
    <div className="form-card">
      <p className='auth-title'>{profile? 'Update': 'Create'} Profile</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formdata.name}
            onChange={handleChange}
            placeholder="Enter your Business name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <select name="industry" id="industry" value={formdata.industry} onChange={handleChange} required>
            <option value="" disabled>Select industry</option>
            {['restaurant', 'cafe', 'hotel', 'catering',
              'event venue', 'wedding', 'exhibition & conference',
              'retail', 'supermarket', 'other'
            ].map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>

        </div>

        <div className="form-group">
          <label htmlFor="imageURL">Image URL</label>
          <input
            type="url"
            id="imageURL"
            name="imageURL"
            value={formdata.imageURL}
            onChange={handleChange}
            placeholder="https://example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="websiteURL">Website URL</label>
          <input
            type="url"
            id="websiteURL"
            name="websiteURL"
            value={formdata.websiteURL}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formdata.description}
            onChange={handleChange}
            placeholder="Tell people about your business"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
          {sending
            ? (profile ? 'Updating...' : 'Creating...')
            : (profile ? 'Update' : 'Create')
          }
        </button>
      </form>
    </div>
  );
}

export default ProfileForm
