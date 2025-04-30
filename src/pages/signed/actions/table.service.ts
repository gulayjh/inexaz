import {API} from '../../../core/configs/api.config';
import axiosInstance from '../../../core/configs/axios.config';

export const getSessions = (searchFin: string, current: number, signed: boolean) => {
    return axiosInstance.get(API.sessions, {
        params: {
            search: searchFin?.trim(),
            page: current,
            take: 10,
            isSigned: signed
        }
    }).then(res => {
        return res.data;

    });
};

export const getSessionsPost = (searchFin: string, current: number, signed: boolean, startDate: any, endDate: any) => {
    return axiosInstance.post(API.getSessions, {
        search: searchFin?.trim(),
        page: current,
        take: 10,
        isSigned: signed,
        startDate: startDate ? startDate + 'T00:00:00' : undefined,
        endDate: endDate ? endDate + 'T00:00:00' : undefined,

    }).then(res => {
        return res.data;

    });
};

export const sessionDelete = (credentials: any): Promise<any> => {
    return axiosInstance.post(`${API.sessionsDelete}`, credentials)
        .then(res => res.data);
};
