import {useMutation} from 'react-query';
import {store} from '../../../store/store.config';
import {setOperationId} from '../../../store/store.reducer';
import {startSession} from './session.service';

export const useSessionStart = (onSucces: any) => {
    return useMutation({
        mutationFn: (linkPart: any) => {
            return startSession(linkPart);
        },
        onSuccess: (response: any) => {
            onSucces();
        },
    });
};

