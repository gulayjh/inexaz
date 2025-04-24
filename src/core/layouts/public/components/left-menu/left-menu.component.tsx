import {memo, useEffect, useState} from 'react';
import LeftMenuItemComponent from '../left-menu-item/left-menu-item.component';
import {generateGuid} from '../../../../helpers/generate-guid';
import {HomeIcon, SignedIcon, UnsignedIcon, UsersIcon} from '../../../../../assets/images/icons/left-menu';
import {Routes} from '../../../../../router/routes';
import {useLeftMenuStyles} from './left-menu.style';
import classNames from 'classnames';
import useLocalization from '../../../../../assets/lang';
import {useDispatch, useSelector} from 'react-redux';
import {IState} from '../../../../../store/store';
import {setLocale, toggleLeftMenu} from '../../../../../store/store.reducer';
import devizeSize from '../../../../helpers/devize-size';

const LeftMenuComponent = memo(({isOpen}: { isOpen: boolean }) => {
    const classes = useLeftMenuStyles();

    const translate = useLocalization();
    const user = useSelector((state: IState) => state.user);
    const items = [
        {
            id: 1,
            name: translate('add_title'),
            link: Routes.home,
            icon: <HomeIcon/>,
            show: true,
            hasUnderLine: true
        },
        {
            id: 2,
            name: translate('verify_title'),
            link: Routes.verify,
            icon: <HomeIcon/>,
            show: true,
            hasUnderLine: true
        },
        {
            id: 3,
            name: translate('signed_title'),
            link: Routes.signed,
            icon: <SignedIcon/>,
            show: true,
            hasUnderLine: false

        },
        {
            id: 4,
            name: translate('unsigned_title'),
            link: Routes.unsigned,
            icon: <UnsignedIcon/>,
            show: true,
            hasUnderLine: false

        },
        {
            id: 5,
            name: translate('users'),
            link: Routes.users,
            icon: <UsersIcon/>,
            hasUnderLine: true,
            show: user?.Roles.includes('Admin') || user?.Roles.includes('SuperAdmin')


        },
    ];


    const leftMenuClasses = classNames({
        [classes.leftMenu]: true,
        [classes.hide]: !isOpen,
    });

    return (
        <div className={leftMenuClasses}>
            <ul>
                {
                    items.map((i: any) => (
                        <LeftMenuItemComponent
                            key={generateGuid()}
                            name={i.name}
                            link={i.link}
                            icon={i.icon}
                            submenu={i.submenu}
                            show={i.show}
                            hasUnderLine={i.hasUnderLine}

                        />
                    ))
                }
            </ul>
        </div>
    );
});


export default LeftMenuComponent;
