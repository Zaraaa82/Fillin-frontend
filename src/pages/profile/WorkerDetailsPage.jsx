import React, { useEffect, useState } from 'react'
import {getWorkerProfile} from '../../services/workerProfileService';
import WorkerProfile from '../../components/profiles/worker/Profile';
import { useParams } from 'react-router';

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

    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error: {error}</p>
    }
  return (
    <div>
        <h1>Worker Profile Page</h1>
        <WorkerProfile profile={profile}/>

    </div>
  )
}

export default ProfilePage
