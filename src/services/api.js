import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
    headers: {
		'content-type': 'application/json',
		'accept': 'application/json',
	} 
});

if (localStorage.token) api.defaults.headers.common['x-access-token'] = localStorage.getItem('token');

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if (error.code === "ERR_NETWORK") {
        return Promise.reject('Falha na conexão ou servidor!');
    }

    if (error.response.status === 401 && window.location.pathname !== '/login') {
        window.location.replace('/login');
    }

    if (error.response.data.errors) {

        const errorsMsg = error.response.data.errors.reduce((acc, cur, index) => {
    
            let msg = acc + (index > 0 ? '<br>' : '') + cur.msg; 
    
            return msg
    
        }, '');
    
        return Promise.reject(errorsMsg);

    }

    return Promise.reject('Um problema inesperado ocorreu. Caso o problema persista, entre em contato com os administradores do sistema.');

});

export default api;