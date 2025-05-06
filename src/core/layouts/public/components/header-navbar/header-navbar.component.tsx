import HeaderRightComponent from '../header-right/header-right.component';
import logo from '../../../../../assets/images/statics/inex.png';
import {useHeaderNavbarStyles} from './header-navbar.style';
import {NavLink} from 'react-router-dom';
import {Routes} from '../../../../../router/routes';
import HeaderSubComponent from '../header-sub/header-sub.component';
import {handleLeftMenu, toggleLeftMenu} from '../../../../../store/store.reducer';
import {useDispatch} from 'react-redux';
import {LeftMenuToggle} from '../../../../../assets/images/icons/left-menu-toggle';
import React, {useCallback} from 'react';
import devizeSize from '../../../../helpers/devize-size';

const HeaderNavbarComponent = () => {
    const classes = useHeaderNavbarStyles();
    const dispatch = useDispatch();

    const toggleMenu = () => {
        dispatch(toggleLeftMenu());
    };

    const width = devizeSize();
    const onMenuClick = useCallback(() => {
        if (width > 0) {
            if (width > 1024) {
                dispatch(handleLeftMenu(true));
            } else {
                dispatch(handleLeftMenu(false));
            }
        }
    }, [width]);
    return (
        <div className={`${classes.navbar} py-8 pl-30 pr-20`}>
            <div className="row align-center">
                <div className="col-8">
                    <div className={classes.left}>
                        <NavLink to={Routes.default} onClick={onMenuClick}>
                            <img src={logo} alt="logo"/>
                        </NavLink>
                    </div>
                </div>
                <div className="d-flex justify-end col-4 pr-50">
                    <HeaderRightComponent/>
                </div>
            </div>
        </div>
    );
};

export default HeaderNavbarComponent;
