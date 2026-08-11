import React from 'react'
import { useState, useEffect } from 'react'
import ShiftList from '../../components/shifts/ShiftList'
import { getMyProfile } from '../../services/businessProfileService'

function BusinessShiftsPage() {
  const [businessProfile, setBusinessProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await getMyProfile();
        setBusinessProfile(profile);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchProfile();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!businessProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Business Shifts</h1>
      <ShiftList businessId={businessProfile._id} />
    </div>
  )
}

export default BusinessShiftsPage
