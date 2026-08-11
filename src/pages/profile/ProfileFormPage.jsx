import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react';
import {getMyProfile as getWorkerProfile} from '../../services/workerProfileService';
import {getMyProfile as getBusinessProfile} from '../../services/businessProfileService';
import WorkerProfileForm from '../../components/profiles/worker/ProfileForm';
import BusinessProfileForm from '../../components/profiles/business/ProfileForm';


function ProfileFormPage() {
  const {user} = useAuth();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (!user) return;
        if (!user.isProfileComplete) {
          setLoading(false);
          return;
        }

        if (user.role === 'worker') {
          setProfile(await getWorkerProfile());
        } else {
          setProfile(await getBusinessProfile());
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [user]);

  if(loading){
    return <p>Loading...</p>
  }

  if(error){
    return <p>Error: {error}</p>
  }

  return (
    <div>
      <h1>{user?.isProfileComplete ? 'Edit Profile' : 'Create Profile'}</h1>
      {user?.role === 'worker' ? (
        <WorkerProfileForm profile={profile} />
      ) : (
        <BusinessProfileForm profile={profile} />
      )}
    </div>
  );
}

export default ProfileFormPage
