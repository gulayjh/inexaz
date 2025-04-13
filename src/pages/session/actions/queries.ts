import {useQuery} from 'react-query';
import {getSession} from './session.service';

export const useGetSession = (linkPart: any) => {
    return useQuery<any, Error>(['getSessionByLink', [linkPart]], () => {
        return getSession(linkPart);
    }, {
        staleTime: Infinity, retry: false, enabled: typeof linkPart === 'string' && linkPart.trim() !== ''
    });
};
