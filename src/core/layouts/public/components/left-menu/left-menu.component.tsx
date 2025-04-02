import {memo} from 'react';
import LeftMenuItemComponent from '../left-menu-item/left-menu-item.component';
import {generateGuid} from '../../../../helpers/generate-guid';
import {HomeIcon} from '../../../../../assets/images/icons/left-menu';
import {Routes} from '../../../../../router/routes';
import {useLeftMenuStyles} from './left-menu.style';
import classNames from 'classnames';
import useLocalization from '../../../../../assets/lang';

const LeftMenuComponent = memo(({isOpen}: { isOpen: boolean }) => {
    const classes = useLeftMenuStyles();

    const translate = useLocalization();

    const items = [
        {
            id: 1,
            name: translate('add_title'),
            link: Routes.home,
            icon: <HomeIcon/>,
        },
        {
            id: 2,
            name: translate('signed_title'),
            link: Routes.signed,
            icon: <HomeIcon/>,
        },
        {
            id: 3,
            name: translate('unsigned_title'),
            link: Routes.unsigned,
            icon: <HomeIcon/>,

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
                        />
                    ))
                }
            </ul>
        </div>
    );
});


export default LeftMenuComponent;
