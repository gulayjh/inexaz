import {API} from '../../../core/configs/api.config';
import axiosInstance from '../../../core/configs/axios.config';

export const getRoles = () => {
    return axiosInstance.get(API.roles).then(res => {
        return res.data;
    });
};
