import axios from 'axios';

export const login = async (user) => {
    return axios.post('/login', user)
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
    return axios.post('/register', user) 
        .then(res => res.data);
}

export const logout = async () => {
    return axios.get('/logout')
        .then(res => res.data);
}