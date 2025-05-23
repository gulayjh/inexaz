import {ILeftMenuItemProps} from '../../public';
import {useLeftMenuItemStyles} from './left-menu-item.style';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {generateGuid} from '../../../../helpers/generate-guid';
import {useCallback, useEffect, useState} from 'react';
import {ArrowDown, ArrowRight} from '../../../../../assets/images/icons/arrows';
import classNames from 'classnames';
import {handleLeftMenu} from '../../../../../store/store.reducer';
import {useDispatch} from 'react-redux';
import devizeSize from '../../../../helpers/devize-size';

const LeftMenuItemComponent = ({name, link, icon, submenu, show, hasUnderLine}: ILeftMenuItemProps) => {
    const classes = useLeftMenuItemStyles();
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const leftMenuItemClasses = classNames({
        [classes.link]: true,
        'active': submenuOpen,
    });
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const width = devizeSize();
    const onMenuClick = useCallback((link: string) => {
        if (width > 0) {
            if (width > 1024) {
                dispatch(handleLeftMenu(true));
                navigate(link);
            } else {
                dispatch(handleLeftMenu(false));
                navigate(link);

            }
        }
    }, [width]);

    useEffect(() => {
        if (width > 0) {
            if (width > 1024) {
                dispatch(handleLeftMenu(true));
            } else {
                dispatch(handleLeftMenu(false));
            }
        }
    }, []);
    return (
        <li className={classes.item}>
            {
                submenu ?
                    <>
                        <div className={leftMenuItemClasses} onClick={() => setSubmenuOpen(!submenuOpen)}>
                            <div className={classes.itemText}>
                                {icon}
                                <span>{name}</span>
                            </div>
                        </div>
                        {
                            submenuOpen ?
                                <ul className={classes.submenu}>
                                    {
                                        submenu.map((item: any) => {
                                            return (
                                                <li key={generateGuid()}>
                                                    <NavLink to={item.link} className={classes.subLink}>
                                                        {item.icon}
                                                        <span>{item.name}</span>
                                                    </NavLink>

                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                                :
                                null
                        }
                    </>
                    :

                    show ?

                        <div
                            className={`${classes.link}  ${location.pathname === link ? 'active' : null}`}
                            onClick={() => {
                                onMenuClick(link);
                            }}
                        >
                            <div className={classes.itemText}>
                                {icon}
                                <span>{name}</span>
                            </div>
                        </div>

                        : null
            }


        </li>
    );
};

export default LeftMenuItemComponent;
