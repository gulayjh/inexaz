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
        display: 'flex',
        flexWrap: 'wrap'
    },
    listItem: {
        display: 'flex',
        position: 'relative',
        marginBottom: rem(15),
        flexDirection: 'column',
        justifyContent: 'center',
        width: rem(250),
        height: rem(200),
        backgroundColor: 'white',
        borderRadius: rem(10),
        padding: rem(10),
        boxShadow: '0px 20px 20px rgb(126 142 177 / 12%)',
        '& span': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: rem(150),
            '& svg': {
                transform: 'scale(3)'
            },

        },
        '& h5': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: rem(225)
        },

        [breakpoint(1200)]: {
            margin: `${rem(15)} auto`,
        },

    },
    deleteButton: {
        width: rem(10),
        height: rem(10),
        position: 'absolute',
        top: rem(-50),
        right: rem(20),
        cursor: 'pointer'
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

};

// @ts-ignore
export const useUploadStyles = createUseStyles(styles);
