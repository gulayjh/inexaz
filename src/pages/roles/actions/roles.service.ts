import {API} from '../../../core/configs/api.config';
import axiosInstance from '../../../core/configs/axios.config';
import axiosInstanceLoader from '../../../core/configs/axiosLoader.config';

export const getRoles = () => {
    return axiosInstanceLoader.get(API.roles).then(res => {
        return res.data;
    });
};
