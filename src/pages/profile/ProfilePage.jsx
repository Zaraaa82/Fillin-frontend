import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import {getMyProfile as getWorkerProfile} from '../../services/workerProfileService';
import {getMyProfile as getBusinessProfile} from '../../services/businessProfileService';
import WorkerProfile from '../../components/profiles/worker/Profile';
import BusinessProfile from '../../components/profiles/business/Profile';
import { Flex, Spin } from 'antd';

function ProfilePage() {
    const {user} = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        async function fetchProfile(){
            try{            
                if(user.role === 'worker'){
                    setProfile(await getWorkerProfile());

                } else{
                    setProfile(await getBusinessProfile());
                }
    
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }
        fetchProfile();
    },[]);

  if (loading) {
    return(
      <Flex justify="center" align="center" style={{ height: '50vh' }}>
        <Spin size="large" style={{color: '#14b8a6'}}/>
      </Flex>
    )
  }

    if(error){
        return <p>Error: {error}</p>
    }
  return (
    user.role === 'worker' ?
      <WorkerProfile profile={profile}/>
    :
      <BusinessProfile profile={profile}/>
  )
}

export default ProfilePage