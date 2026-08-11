import React, { useEffect, useState } from 'react';


function ProfileForm() {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  
  // const initialForm = {
  //   name: '',
  //   industry: '',
  //   imageURL: '',
  //   description: '',
  //   websiteURL: ''
  // }
  const [formdata, setFormData] = useState({});

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
    }, []);
  return (
    <div>
      
    </div>
  )
}

export default ProfileForm
