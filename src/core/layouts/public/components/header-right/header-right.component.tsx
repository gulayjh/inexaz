import avatar from '../../../../../assets/images/statics/user.png';
import {LogoutIcon} from '../../../../../assets/images/icons/logout';
import {useHeaderRightStyles} from './header-right.style';
import {removeToken} from "../../../../helpers/get-token";
import {useNavigate} from "react-router-dom";

const HeaderRightComponent = () => {
    const classes = useHeaderRightStyles();
    const navigate = useNavigate();

    const logout = () => {
        removeToken();
        navigate('/auth/login');
    };

    return (
        <ul className={classes.items}>
            <li className={classes.avatar}>
                <img src={avatar} alt='avatar'/>
            </li>
            <li className={classes.logout} onClick={logout}>
                <LogoutIcon/>
            </li>
        </ul>
    );
};

export default HeaderRightComponent;
