import api from './api'

async function getAllShifts() {
    try{
        const response = await api.get(`/shifts`);
        return response.data;

    }catch(err){
        throw new Error (err.response.data.message);
    }   
}

async function getShiftById(shiftId) {
    try{
        const response = await api.get(`/shifts/${shiftId}`);
        return response.data;

    }catch(err){
        throw new Error (err.response.data.message);
    }   
}

async function getShiftsByBusiness(businessId) {
    try{
        const response = await api.get(`/shifts/business/${businessId}`);
        return response.data;

    }catch(err){
        throw new Error (err.response.data.message);
    }   
}

async function createShift(body) {
    try{
        const response = await api.post(`/shifts`, body);
        return response.data;

    }catch(err){
        throw new Error (err.response.data.message);
    }   
}

async function updateShift(shiftId, body) {
    try{
        const response = await api.put(`/shifts/${shiftId}`, body);
        return response.data;

    }catch(err){
        throw new Error (err.response.data.message);
    }   
}

async function cancelShift(shiftId) {
    try{
        const response = await api.delete(`/shifts/${shiftId}`);
        return response.data;

    }catch(err){
        throw new Error (err.response.data.message);
    }   
}


export {
    getAllShifts,
    getShiftById,
    getShiftsByBusiness,
    createShift,
    updateShift,
    cancelShift 
}
