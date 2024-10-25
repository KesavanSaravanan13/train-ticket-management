import axios from 'axios';
import {FormValues} from '../../pages/login/LoginForm';

const AxiosCall = axios.create({
    baseURL:'http://localhost:8080/user/login'
});


export const createProducts = (formData : FormValues) => {
    return AxiosCall.post('', formData);
};

AxiosCall.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    console.error('Bad Request', error.response.data);
                    break;
                case 401:
                    console.error('Unauthorized Request', error.response.data);
                    break;
                case 404:
                    console.error('Not Found', error.response.data);
                    break;
                case 500:
                    console.error('Internal Server Error', error.response.data);
                    break;
                default:
                    break;
            }
        } else {
            console.error('Network Error', error.response.data);
        }
        return Promise.reject(error);
    }
);

export default AxiosCall;