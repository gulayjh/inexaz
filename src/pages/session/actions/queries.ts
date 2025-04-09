import {useQuery} from 'react-query';
import {getUsers} from './user.service';

export const useGetUser = (searchFin: string, current: number) => {
    return useQuery<any[], Error>(['getUsers', [searchFin, current]], () => {
        return getUsers(searchFin, current);
    }, {staleTime: Infinity, retry: false});
};
