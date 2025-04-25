import { useMutation } from 'react-query';
import {getSessionsPost, sessionDelete} from './table.service';

interface SessionParams {
    searchFin: any;
    current: any;
    signed: boolean;
    startDate: any,
    endDate: any
}

export const useGetSessionPost = (
    onSuccess: (data: any) => void

) => {
    return useMutation({
        mutationFn: ({ searchFin, current, signed, startDate, endDate }: SessionParams) =>
            getSessionsPost(searchFin, current, signed, startDate, endDate),
        onSuccess: (response: any) => {
            onSuccess(response);
        },
    });
};


export const useDeleteSession = (onSuccess: any) => {
    return useMutation({
        mutationFn: (credentials: any) => {
            return sessionDelete(credentials);
        },
        onSuccess: (response: any) => {
            onSuccess();
        },
    });
};