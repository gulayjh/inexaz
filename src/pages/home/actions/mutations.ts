import {useMutation} from 'react-query';
import {upload} from './upload.service';
import {store} from '../../../store/store.config';
import {setUser} from '../../../store/store.reducer';
import {setToken} from '../../../core/helpers/get-token';
import {useNavigate} from 'react-router-dom';
import {Routes} from '../../../router/routes';

export const useUpload = () => {
    return useMutation({
        mutationFn: (credentials: any) => {
            return upload(credentials);
        },
        onSuccess: (response) => {
            console.log(response);
        },
    });
};
