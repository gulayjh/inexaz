import {useQuery} from 'react-query';
import {getSessions} from './table.service';

export const useGetSession = (searchFin: string, current: number, signed: boolean) => {
    return useQuery<any[], Error>(['getSession', searchFin, current, signed], () => {
        return getSessions(searchFin, current, signed);
    }, {staleTime: 0, retry: false, refetchOnMount:true});
};
