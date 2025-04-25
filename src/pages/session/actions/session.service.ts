import {API} from '../../../core/configs/api.config';
import axiosInstance from '../../../core/configs/axios.config';

export const getSession = (linkPart: string) => {
    return axiosInstance.get(`${API.sessions}/${linkPart}`).then(res => {
        return res.data;
    });
};

export const startSession = (dynamicLinkPart: any): Promise<any> => {
    return axiosInstance.post(`${API.sessions}/start`, {
        dynamicLinkPart: dynamicLinkPart
    }).then((res) => res.data);
};

export const deleteSession = (credentials: any): Promise<any> => {
    return axiosInstance.post(API.sessionsDelete, credentials)
        .then((res) => res.data);
};


