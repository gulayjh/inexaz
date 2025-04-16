import logo from '../../../../../assets/images/statics/inex.png';
import {useHeaderNavbarStyles} from './header-navbar.style';
import {NavLink} from 'react-router-dom';
import {Routes} from '../../../../../router/routes';
import {toggleLeftMenu} from "../../../../../store/store.reducer";
import {useDispatch} from "react-redux";
import React from "react";

const HeaderNavbarComponent = () => {
    const classes = useHeaderNavbarStyles();
    const dispatch = useDispatch();

    const toggleMenu = () => {
        dispatch(toggleLeftMenu());
    };
    return (
        <div className={`${classes.navbar} py-8 pl-30 pr-20`}>
            <div className='row align-center'>
                <div className='col-8'>
                    <div className={classes.left}>
                            <img src={logo} alt='logo'/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HeaderNavbarComponent;
