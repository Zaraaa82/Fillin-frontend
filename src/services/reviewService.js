import api from './api'

async function createReview(applicationId, body) {
    try{
        const response = await api.post(`/reviews/applications/${applicationId}`, body);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

async function getWorkerReviews(workerId) {
    try{
        const response = await api.get(`/reviews/worker/${workerId}`);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

async function getBusinessReviews(businessId) {
    try{
        const response = await api.get(`/reviews/business/${businessId}`);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

async function updateReview(reviewId, body) {
    try{
        const response = await api.put(`/reviews/${reviewId}`, body);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}
async function deleteReview(reviewId) {
    try{
        const response = await api.delete(`/reviews/${reviewId}`);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

export{
    createReview,
    updateReview,
    deleteReview,
    getWorkerReviews,
    getBusinessReviews
}