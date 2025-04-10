import {API} from '../../../core/configs/api.config';
import axiosInstance from '../../../core/configs/axios.config';

export const getSessions = (searchFin: string, current: number, signed: boolean) => {
    return axiosInstance.get(API.sessions, {
        params: {
            search: searchFin?.trim(),
            page: current,
            take: 10,
            isSigned:signed
        }
    }).then(res => {
       return res.data.data;
        
    });
};

