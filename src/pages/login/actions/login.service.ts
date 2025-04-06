import {API} from '../../../core/configs/api.config';
import axiosInstance from '../../../core/configs/axios.config';
import {ILoginFormValues} from '../login.component.d';
import {removeToken} from '../../../core/helpers/get-token';
import {store} from '../../../store/store.config';
import {setUser} from '../../../store/store.reducer';
import {Routes} from '../../../router/routes';

export const login = (credentials: ILoginFormValues): Promise<{ token: any }> => {
    return axiosInstance.post(API.login, credentials)
        .then((res) => res.data);
};

export const logout = (onSuccess:any): Promise<any> => {
    return axiosInstance.post(API.logout)
        .then(() => {
            removeToken();
            window.location.href = 'auth/login';
        });
};

