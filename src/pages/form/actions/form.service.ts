import {API} from '../../../core/configs/api.config';
import axiosInstance from '../../../core/configs/axios.config';

export const addPost = (post: any): Promise<any> => {
    return axiosInstance.post(API.upload, post)
        .then((res) => res.data);
};

