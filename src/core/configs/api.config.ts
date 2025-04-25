import {environment} from './app.config';

const base = environment.apiMain;
export const API = {
    signalR: base + '/signingHub',
    upload: base + '/sessions',
    login: base + '/auth/login',
    logout: base + '/auth/logout',
    sessions: base + '/sessions',
    getSessions: base + '/sessions/getAll',
    sessionsDelete: base + '/sessions/delete',

    users: base + '/users',
    changePassword: base + '/users/changePassword',
    check: base + '/auth/check'


};
