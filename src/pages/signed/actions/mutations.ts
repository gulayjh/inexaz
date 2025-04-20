import { useMutation } from 'react-query';
import { getSessionsPost } from './table.service';

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
