import {createUseStyles} from 'react-jss';
import fonts from '../../assets/styles/abstracts/fonts';
import {rem} from '../../assets/styles/abstracts/functions';
import {breakpoint} from '../../assets/styles/abstracts/mixins';


const styles = {

    title: {
        fontFamily: fonts.fontBold,
        lineHeight: rem(32),
        fontSize: rem(18),
        marginBottom: rem(25),
        marginTop: rem(10),
        color: '#474975'
    },
    titleInfo: {
        display: 'flex',
        alignItems: 'center',
        fontFamily: fonts.font,
        lineHeight: rem(32),
        fontSize: rem(14),
        color: '#474975',
        marginBottom: rem(25),

        '& span': {
            paddingLeft: rem(5),
        }
    },

};

export const useUserStyles = createUseStyles(styles);
