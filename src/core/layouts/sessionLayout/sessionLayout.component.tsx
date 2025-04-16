import HeaderComponent from './components/header/header.component';
import {Outlet} from 'react-router-dom';
import FooterComponent from './components/footer/footer.component';
import {usePublicLayoutStyles} from './sessionLayout.style';
import classNames from 'classnames';
import {useStore} from '../../../store/store.config';

const SessionLayoutComponent = () => {
    const classes = usePublicLayoutStyles();
    const leftMenu = useStore('leftMenu');

    const publicClasses = classNames({
        [classes.content]: true,
        [classes.active]: true,
    });

    return (
        <div className={classes.public}>
            <HeaderComponent/>
            <div className={publicClasses}>
                <Outlet/>
            </div>
            <FooterComponent isOpen={leftMenu}/>
        </div>
    );
};


export default SessionLayoutComponent;

