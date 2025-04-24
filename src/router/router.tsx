import {createBrowserRouter} from 'react-router-dom';
import PublicComponent from '../core/layouts/public/public.component';
import HomeComponent from '../pages/home/home.component';
import FormComponent from '../pages/form/form.component';
import {Routes} from './routes';
import NotFound from '../pages/not-found/notfound.component';
import AuthComponent from '../core/layouts/auth/auth.component';
import LoginComponent from '../pages/login/login.component';
import AuthProtectedComponent from './protected/auth-protected.component';
import UnsignedComponent from "../pages/unsigned/unsigned.component";
import SignedComponent from "../pages/signed/signed.component";
import UsersComponent from '../pages/user/users.component';
import SessionComponent from '../pages/session/sessions.component';
import SessionLayoutComponent from '../core/layouts/sessionLayout/sessionLayout.component';
import VerifyComponent from '../pages/check/verify.component';

const router = createBrowserRouter([
    {
        element: <AuthProtectedComponent layout='public'><PublicComponent/></AuthProtectedComponent>,
        children: [
            {
                path: Routes.unsigned,
                element: <UnsignedComponent/>,
            },
            {
                path: Routes.verify,
                element: <VerifyComponent/>,
            },
            {
                path: Routes.signed,
                element: <SignedComponent/>,
            },
            {
                path: Routes.home,
                element: <HomeComponent/>,
            },
            {
                path: Routes.users,
                element: <UsersComponent/>,
            },

        ],
    },
    {
        path: Routes.auth,
        element: <AuthProtectedComponent layout='auth'><AuthComponent/></AuthProtectedComponent>,
        children: [
            {
                path: Routes.login,
                element: <LoginComponent/>,
            },
        ],
    },
    {
        path: Routes.session,
        element: <AuthProtectedComponent layout='session'><SessionLayoutComponent/></AuthProtectedComponent>,
        children: [
            {
                path: Routes.session,
                element: <SessionComponent/>,
            }
        ],
    },
    {
        path: '*',
        element: <NotFound/>,
    }
], {basename: '/',});

export default router;
