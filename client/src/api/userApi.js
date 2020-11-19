import axios from 'axios';

export const isAuthenticated = async () => {
    return axios.get('/user/is-authenticated')
        .then(res => res.data)
        .catch(() => {
            return {
                isAuthenticated: false,
                user: ''
            }
        })
}

export const updateWeight = async (userId, payload) => {
    // if _id is not provided in payload then it will POST, OTW it PUTS
    return axios.put(`/user/${userId}`, payload)
        .then(res => res.data)
        .catch(() => {
            console.log('did not update weight')
        })
}

export const removeWeight = async (userId, weightId) => {
    return axios.delete(`/user/${userId}`, weightId)
        .then(res => res.data)
        .catch(() => {
            console.log('did not delete weight')
        })
} 