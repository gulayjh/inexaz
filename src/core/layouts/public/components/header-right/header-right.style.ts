import {createUseStyles} from 'react-jss';
import {rem} from '../../../../../assets/styles/abstracts/functions';
import colors from '../../../../../assets/styles/abstracts/color';
import fonts from '../../../../../assets/styles/abstracts/fonts';

const styles = {
    items: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        '& li': {
            color: '#fff',
            fontFamily: fonts.font,
        }
    },
    avatar: {
        cursor: 'pointer',
        marginRight: '15px',
        '& img': {
            width: rem(28),
            height: rem(28),
            objectFit: 'cover',
            borderRadius: '5px',
        },
    },
    logout: {
        cursor: 'pointer',
    },
    sub: {
        background: colors.light,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0px 20px 20px rgb(126 142 177 / 12%)',
    },
    subItem: {
        paddingLeft: rem(10),

        display: 'flex',
        cursor: 'pointer'
    },
};

export const useHeaderRightStyles = createUseStyles(styles);
