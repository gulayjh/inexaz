import {environment} from "./app.config";

const base = environment.apiMain;
export const API = {
    signalR: 'https://innex.az/api/v1/sessions',
    upload: base + '/sessions',
    login: base + '/auth/login',
    sessions: base + '/sessions',

};
