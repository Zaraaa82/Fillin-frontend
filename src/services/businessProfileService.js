import api from './api'

async function getMyProfile() {
    try{
        const response = await api.get(`/business-profiles/me`);
        return response.data;

    }catch(err){
        throw new Error (err.response.data.message);
    }   
}

async function getBusinessProfile(businessId) {
    try{
        const response = await api.get(`/business-profiles/${businessId}`);
        return response.data;

    }catch(err){
        throw new Error (err.response.data.message);
    } 
}

async function createProfile(body) {
    try{
        const response = await api.post(`/business-profiles`, body);
        return response.data;

    }catch(err){
        throw new Error (err.response.data.message);
    } 
}

async function updateProfile(body) {
    try{
        const response = await api.put(`/business-profiles`, body);
        return response.data;

    }catch(err){
        throw new Error (err.response.data.message);
    } 
}

export {
    getMyProfile,
    getBusinessProfile,
    createProfile,
    updateProfile
}
