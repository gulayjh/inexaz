import colors from '../../assets/styles/abstracts/color';
import {rem} from '../../assets/styles/abstracts/functions';
import {createUseStyles} from 'react-jss';
import sizes from '../../assets/styles/abstracts/sizes';
import fonts from '../../assets/styles/abstracts/fonts';
import {breakpoint} from '../../assets/styles/abstracts/mixins';

const styles = {

    chooseButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        '& h3': {
            color: colors.headerNavBg,
            fontSize: sizes.base,
            fontFamily: fonts.fontBold,
            paddingLeft: rem(5),
            paddingBottom: rem(5),
            marginBottom: rem(0)
        }

    },
    form: {
        width: '30%',
    },


    upload: {
        '& div': {
            marginBottom: rem(0)
        }
    },

    list: {
        boxShadow: '0px 4px 18px 0px rgba(0, 0, 0, 0.06)',
        width: rem(360),
        background: colors.white,
        padding: {
            top: rem(72),
            bottom: 14,
            left: 12,
            right: 12
        },
        display: 'inline-block',
        color: '#474975',
        fontFamily: fonts.font,
        fontSize: rem(18),
    },
    row: {
        paddingBottom: rem(15),
        '& li': {
            display: 'flex',
            alignItems: 'baseline',
            color: '#474975',
            fontFamily: fonts.font,
            fontSize: rem(16),
            letterSpacing: rem(0.045),
        }
    },
    title: {
        fontFamily: fonts.fontBold,
        lineHeight: rem(32),
        fontSize: rem(18),
        marginBottom: rem(10),
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
    noData: {

        '& span': {
            display: 'inline-block',
            color: '#474975',
            fontFamily: fonts.font,
            fontSize: rem(16),
        },

        '& h5': {
            color: '#474975',
            fontFamily: fonts.fontBold,
            fontSize: rem(16),
        }

    },
};

// @ts-ignore
export const useUploadStyles = createUseStyles(styles);
