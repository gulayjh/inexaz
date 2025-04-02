import avatar from '../../../../../assets/images/statics/user.png';
import {LogoutIcon} from '../../../../../assets/images/icons/logout';
import {useHeaderRightStyles} from './header-right.style';
import {removeToken} from "../../../../helpers/get-token";
import {useNavigate} from "react-router-dom";
import {LeftMenuToggle} from "../../../../../assets/images/icons/left-menu-toggle";
import React from "react";
import {toggleLeftMenu} from "../../../../../store/store.reducer";
import {useDispatch} from "react-redux";

const HeaderRightComponent = () => {
    const classes = useHeaderRightStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        removeToken();
        navigate('/auth/login');
    };

    const toggleMenu = () => {
        dispatch(toggleLeftMenu());
    };


    return (
        <ul className={classes.items}>
            <li className={classes.avatar}>
                <img src={avatar} alt='avatar'/>
            </li>
            <li className={classes.logout} onClick={logout}>
                <LogoutIcon/>
            </li>
            <li className={classes.subItem} onClick={toggleMenu}>
                <LeftMenuToggle/>
            </li>
        </ul>
    );
};

export default HeaderRightComponent;
