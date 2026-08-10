import api from './api'

async function getMyProfile() {
    try{
        const response = await api.get(`/worker-profiles/me`);
        return response.data;

    }catch(err){
        throw new Error (err.response.data.message);
    }   
}

async function getWorkerProfile(workerId) {
    try{
        const response = await api.get(`/worker-profiles/${workerId}`);
        return response.data;

    }catch(err){
        throw new Error (err.response.data.message);
    } 
}

async function createProfile(body) {
    try{
        const response = await api.post(`/worker-profiles`, body);
        return response.data;

    }catch(err){
        throw new Error (err.response.data.message);
    } 
}

async function updateProfile(body) {
    try{
        const response = await api.put(`/worker-profiles`, body);
        return response.data;

    }catch(err){
        throw new Error (err.response.data.message);
    } 
}

export {
    getMyProfile,
    getWorkerProfile,
    createProfile,
    updateProfile
}
