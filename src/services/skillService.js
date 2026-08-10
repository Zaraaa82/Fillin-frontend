import api from './api'

async function getSkills() {
    try{
        const response = await api.get(`/skills`);
        return response.data;

    }catch(err){
        throw new Error (err.response?.data?.message || err.message);
    }   
}

export {
    getSkills
}
