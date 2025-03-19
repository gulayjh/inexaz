import avatar from '../../../../../assets/images/statics/juan.jpg';
import {LogoutIcon} from '../../../../../assets/images/icons/logout';
import {useHeaderRightStyles} from './header-right.style';

const HeaderRightComponent = () => {
    const classes = useHeaderRightStyles();

    const logout = () => {
        console.log('rest');
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
