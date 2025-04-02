import {API} from '../../../core/configs/api.config';
import axiosInstance from '../../../core/configs/axios.config';
import {ILoginFormValues} from '../login.component.d';

export const login = (credentials: ILoginFormValues): Promise<{ token: any }> => {
    return axiosInstance.post(API.login, credentials)
        .then((res) =>  res.data);
};

