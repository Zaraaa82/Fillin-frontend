import api from './api'

async function applyToShift(shiftId) {
    try{
        const response = await api.post(`/applications/shifts/${shiftId}`);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

async function getShiftApplications(shiftId) {
    try{
        const response = await api.get(`/applications/shifts/${shiftId}`);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

async function getMyApplications() {
    try{
        const response = await api.get(`/applications/me`);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

async function getBusinessApplications() {
    try{
        const response = await api.get(`/applications/business/me`);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

async function getApplicationById(applicationId) {
    try{
        const response = await api.get(`/applications/${applicationId}`);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

async function withdrawApplication(applicationId) {
    try{
        const response = await api.put(`/applications/${applicationId}/withdraw`);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

async function acceptApplication(applicationId, body) {
    try{
        const response = await api.put(`/applications/${applicationId}/accept`, body);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

async function rejectApplication(applicationId, body) {
    try{
        const response = await api.put(`/applications/${applicationId}/reject`, body);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

async function cancelAssignment(applicationId) {
    try{
        const response = await api.put(`/applications/${applicationId}/cancel-assignment`);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

async function updateAttendance(applicationId, body) {
    try{
        const response = await api.put(`/applications/${applicationId}/attendance`, body);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

export {
    applyToShift,
    getShiftApplications,
    getMyApplications,
    getBusinessApplications,
    getApplicationById,
    withdrawApplication,
    acceptApplication,
    rejectApplication,
    cancelAssignment,
    updateAttendance
}
