import React, { useEffect, useState } from 'react';

function ProfileForm({ profile }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

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

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="business-profile-form">
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={formdata.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            id="industry"
            name="industry"
            value={formdata.industry}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageURL">Image URL</label>
          <input
            id="imageURL"
            name="imageURL"
            value={formdata.imageURL}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="websiteURL">Website URL</label>
          <input
            id="websiteURL"
            name="websiteURL"
            value={formdata.websiteURL}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formdata.description}
            onChange={handleChange}
          />
        </div>

        <button type="button" disabled={sending}>
          {sending ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}

export default ProfileForm
