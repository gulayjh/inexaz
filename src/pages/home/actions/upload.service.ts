import {API} from '../../../core/configs/api.config';
import axiosInstance from '../../../core/configs/axios.config';

export const upload = (credentials: any): Promise<{ token: string }> => {
    return axiosInstance.post(API.upload, credentials)
        .then((res) => res.data);
};

export const checkUser = () => {
    return axiosInstance.get(API.check).then(res => {
        return res.data;
    });
};

