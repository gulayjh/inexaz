import {useMutation} from 'react-query';
import {login} from './login.service';
import {ILoginFormValues} from '../login.component.d';
import {store} from '../../../store/store.config';
import {setUser} from '../../../store/store.reducer';
import {setToken} from '../../../core/helpers/get-token';
import {useNavigate} from 'react-router-dom';
import {Routes} from '../../../router/routes';

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (credentials: any) => {
            return login(credentials);
        },
        onSuccess: (response:any) => {
            setToken(response);
            store.dispatch(setUser(response));
            navigate(Routes.home);
        },
    });
};
