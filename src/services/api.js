import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

if (localStorage.token) api.defaults.headers.common['x-access-token'] = localStorage.getItem('token');

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    const errorsMsg = error.response.data.errors.reduce((acc, cur, index) => {

        let msg = acc + (index > 0 ? '<br>' : '') + cur.msg; 

        return msg

    }, '');

    return Promise.reject(errorsMsg);
});

export default api;