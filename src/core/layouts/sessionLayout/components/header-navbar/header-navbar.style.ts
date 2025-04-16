import colors from '../../../../../assets/styles/abstracts/color';
import {rem} from '../../../../../assets/styles/abstracts/functions';
import {createUseStyles} from 'react-jss';

const styles = {
    navbar: {
        backgroundColor: colors.darkBlue,
    },
    left: {
        display: 'flex',
        alignItems: 'center',
        '& img': {
            display: 'block',
            width: rem(100),
        }
    },
    sub: {
        background: colors.light,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0px 20px 20px rgb(126 142 177 / 12%)',
    },
    subItem: {
        display: 'flex',
        cursor: 'pointer'
    },
};

export const useHeaderNavbarStyles = createUseStyles(styles);
