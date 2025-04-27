import {environment} from './app.config';

const base = environment.apiMain;
export const API = {
    signalR: base + '/signingHub',
    upload: base + '/sessions',
    verify: base + '/sign/signHistory',
    login: base + '/auth/login',
    logout: base + '/auth/logout',
    sessions: base + '/sessions',
    getSessions: base + '/sessions/getAll',
    sessionsDelete: base + '/sessions/delete',
    roles: base + '/roles',

    users: base + '/users',
    changePassword: base + '/users/changePassword',
    check: base + '/auth/check'


};
