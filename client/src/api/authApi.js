import axios from 'axios';

export const login = async (user) => {
    return axios.post('/auth/login', user)
        .then(res => res.data)
        .catch(() => {
            return {
                isAuthenticated: false,
                user: '',
                message: {
                    body: 'Invalid username or password',
                    error: true
                }
            }
        })
}

export const register = async (user) => {
    return axios.post('/auth/register', user) 
        .then(res => res.data);
}

export const logout = async () => {
    return axios.get('/auth/logout')
        .then(res => res.data);
}