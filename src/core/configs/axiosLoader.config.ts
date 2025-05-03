import axios, {AxiosResponse, InternalAxiosRequestConfig, AxiosError} from 'axios';
import {environment} from './app.config';
import {store} from '../../store/store.config';
import {setLoader, setUser} from '../../store/store.reducer';
import {errorToast} from '../shared/toast/toast';
import {getToken, setToken} from '../helpers/get-token';

const axiosInstanceLoader = axios.create({
    withCredentials: true,
    headers: {
        'Authorization': 'Bearer ' + getToken(),
    },
});

axiosInstanceLoader.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers.Authorization = `Bearer ${getToken()}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstanceLoader.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {

        if (error.response?.status === 401) {
            const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

            if (!originalRequest._retry) {
                originalRequest._retry = true; // Prevent multiple retries

                try {
                    const refreshResponse = await axios.put(`${environment.apiMain}/auth/refresh`, {}, {withCredentials: true});
                    const newToken = refreshResponse.data;
                        setToken(newToken); // Save new token
                    store.dispatch(setUser(newToken));
                    axiosInstanceLoader.defaults.headers['Authorization'] = `Bearer ${newToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                    return axiosInstanceLoader(originalRequest); // Retry request with new token
                } catch (refreshError) {
                    localStorage.removeItem(`token`);
                    window.location.href = 'auth/login'; // Redirect to login if refresh fails
                }
            }
        }

        // @ts-ignore
        errorToast(error.response?.data?.message ? error.response?.data?.message : 'Xəta baş verdi');
        return Promise.reject(error);
    }
);

export default axiosInstanceLoader;
