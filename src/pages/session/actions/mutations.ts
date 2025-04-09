import {useMutation} from 'react-query';
import {createUser, passwordEdit, userDelete, userEdit} from './user.service';

export const useEditUser = (onSucces: any) => {
    return useMutation({
        mutationFn: (credentials: any) => {
            return userEdit(credentials);
        },
        onSuccess: (response: any) => {
            onSucces();
        },
    });
};
export const useCreateUser = (onSucces: any) => {
    return useMutation({
        mutationFn: (credentials: any) => {
            return createUser(credentials);
        },
        onSuccess: (response: any) => {
            onSucces();
        },
    });
};

export const useEditPassword = (onSuccess: any) => {
    return useMutation({
        mutationFn: (credentials: any) => {
            return passwordEdit(credentials);
        },
        onSuccess: (response: any) => {
            onSuccess();
        },
    });
};

export const useDeleteUser = (onSuccess: any) => {
    return useMutation({
        mutationFn: (credentials: any) => {
            return userDelete(credentials.id, credentials);
        },
        onSuccess: (response: any) => {
            onSuccess();
        },
    });
};
