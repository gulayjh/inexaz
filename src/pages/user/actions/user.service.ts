import {API} from '../../../core/configs/api.config';
import axiosInstance from '../../../core/configs/axios.config';

export const getUsers = (searchFin: string, current: number) => {
    return axiosInstance.get(API.users, {
        params: {
            search: searchFin.trim(),
            page: current,
            take: 10,
        }
    }).then(res => {
        return res.data;
    });
};

export const createUser = (credentials: any): Promise<any> => {
    return axiosInstance.post(API.users, credentials)
        .then((res) => res.data);
};


export const userEdit = (credentials: any): Promise<any> => {
    return axiosInstance.put(API.users, credentials)
        .then((res) => res.data);
};

export const passwordEdit = (credentials: any): Promise<any> => {
    return axiosInstance.put(API.changePassword, credentials)
        .then((res) => res.data);
};

export const userDelete = (id: number, credentials: any): Promise<any> => {
    return axiosInstance.delete(`${API.users}/${id}`, credentials)
        .then(res => res.data);
};