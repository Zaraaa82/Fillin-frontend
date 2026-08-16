import React, { useEffect, useState } from 'react'
import {getWorkerProfile} from '../../services/workerProfileService';
import WorkerProfile from '../../components/profiles/worker/Profile';
import { useParams } from 'react-router';
import { Flex, Spin } from 'antd';

function ProfilePage() {
    const {id} = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({});

    useEffect(()=>{
        async function fetchProfile(){
            try{            
                setProfile(await getWorkerProfile(id));
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }
        fetchProfile();
    },[id]);

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
  return <WorkerProfile profile={profile}/>;
}

export default ProfilePage
