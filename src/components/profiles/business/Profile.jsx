import React from 'react'

export function Profile({ profile }) {
  if (!profile) {
    return <div>No business profile found.</div>
  }

  return (
    <div className="business-profile">
      {profile.imageURL && (
        <img
          src={profile.imageURL}
          alt={profile.name || 'business profile'}
          style={{ maxWidth: 240, width: '100%', height: 'auto' }}
        />
      )}

      <h2>{profile.name}</h2>
      {profile.industry && (
        <p>
          <strong>Industry:</strong> {profile.industry}
        </p>
      )}
      {profile.description && <p>{profile.description}</p>}
      {profile.websiteURL && (
        <p>
          <a href={profile.websiteURL} target="_blank" rel="noreferrer">
            Visit website
          </a>
        </p>
      )}
    </div>
  )
}

export default Profile
