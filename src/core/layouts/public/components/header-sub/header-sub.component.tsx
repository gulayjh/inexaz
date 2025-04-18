import React, {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHeaderSubStyles} from './header-sub.style';
import {LeftMenuToggle} from '../../../../../assets/images/icons/left-menu-toggle';
import classNames from 'classnames';
import {setLocale, toggleLeftMenu} from '../../../../../store/store.reducer';
import {ILanguages, IState} from '../../../../../store/store.d';
import {environment} from '../../../../configs/app.config';
import {ILang} from '../../../../../assets/lang/lang';
import {generateGuid} from '../../../../helpers/generate-guid';
import {useStore} from '../../../../../store/store.config';


const HeaderSubComponent = () => {
    const dispatch = useDispatch();
    const classes = useHeaderSubStyles();
    const toggleMenu = () => {
        dispatch(toggleLeftMenu());
    };
    const headerSubClasses = classNames({
        'py-5 pr-20 pl-30': true,
        [classes.sub]: true,
    });

    const languages = useStore('languages');
    const locale = useSelector((state: IState) => state.locale);

    const currentLang = useMemo(() => {
        return localStorage.getItem(`${environment.applicationName}-locale`) as ILang || 'az';
    }, [locale]);

    useEffect(() => {
        dispatch(setLocale(currentLang));
    }, [currentLang, dispatch]);

    const changeLanguage = useCallback((e: any) => {
        dispatch(setLocale(e.target.value));
    }, [dispatch]);
    return (
        <div className={headerSubClasses}>
            <div className={classes.subItem} onClick={toggleMenu}>
                <LeftMenuToggle/>
            </div>

        </div>
    );
};

export default HeaderSubComponent;
