import {environment} from '../../../../configs/app.config';
import {useFooterStyles} from './footer.style';
import classNames from 'classnames';
import useLocalization from '../../../../../assets/lang';

const FooterComponent = ({isOpen}: { isOpen: boolean }) => {
    const classes = useFooterStyles();
    const projectName = environment.applicationName;
    const date = new Date().getFullYear();
    const translate = useLocalization();

    const footerClasses = classNames({
        [classes.footer]: true,
        [classes.isOpen]: isOpen,
    });

    return (
        <div className={footerClasses}>
            <div className='row m-0'>
                <div className='col-8'>
                    {translate('copyright')} © {date}.
                </div>

            </div>
        </div>
    );
};

export default FooterComponent;
