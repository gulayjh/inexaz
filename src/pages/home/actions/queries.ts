import {useQuery} from 'react-query';
import {checkUser} from './upload.service';

export const useCheckUser = () => {
    return useQuery<any, Error>(['check'], () => {
        return checkUser();
    }, {staleTime: Infinity, retry: false, refetchOnMount:false});
};
