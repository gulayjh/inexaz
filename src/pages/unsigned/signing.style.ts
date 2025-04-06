import {createUseStyles} from 'react-jss';
import fonts from '../../assets/styles/abstracts/fonts';
import {rem} from '../../assets/styles/abstracts/functions';


const styles = {


    list: {
        display: 'flex',
        flexDirection: 'column',
        //borderTop: `1px solid ${colors.borderGray}`
    },
    listItem: {
        fontFamily: fonts.fontMain,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: {
            top: rem(5),
            bottom: rem(5),
            left: rem(10)
        },
        '& span:nth-child(1)': {
            display: 'inline-block',
            wordBreak: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: rem(650),
            whiteSpace: 'nowrap',

        },
        '& div': {
            display: 'flex',
            width: rem(80),
            '& span': {
                cursor: 'pointer'

            }

        }
    },

    bold: {
        fontFamily: `${fonts.fontBold} !important`,
        lineHeight: `${rem(32)} !important`,
        display: 'inline-block',
    },

    title: {
        fontFamily: fonts.fontBold,
        lineHeight: rem(32),
        fontSize: rem(18),
        marginBottom: rem(25),
        marginTop: rem(10),
        color: '#474975'
    },
    panel: {
        display: 'flex',
        justifyContent: 'flex-start',
        '& >span': {
            flexBasis: '20%',
            width: '100%',
            paddingRight: rem(5),

        },
        '& >span:nth-child(1)': {
            flexBasis: '5%',
            width: '100%'
        },
        '& >span:last-child': {
            '& span': {
                flexBasis: '5%',
                width: '100%'
            }
        },

    },


};

export const useSigningsStyles = createUseStyles(styles);
