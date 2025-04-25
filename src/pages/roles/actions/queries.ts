import {useQuery} from 'react-query';
import {getRoles} from './user.service';

export const useGetRoles = () => {
    return useQuery<any[], Error>(['getRoles'], () => {
        return getRoles();
    }, {staleTime: Infinity, retry: false});
};
