import {createUseStyles} from 'react-jss';
import fonts from '../../assets/styles/abstracts/fonts';
import {rem} from '../../assets/styles/abstracts/functions';
import {breakpoint} from '../../assets/styles/abstracts/mixins';


const styles = {


    list: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        '& span': {
            cursor: 'pointer',
            width:'100%'
        },
        [breakpoint(1200)]:{
            marginTop: rem(10),
            justifyContent: 'space-center',
            '& span': {
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                cursor: 'pointer',
                width:'100%'
            },

        }
    },
    title: {
        fontFamily: fonts.fontBold,
        lineHeight: rem(32),
        fontSize: rem(18),
        marginBottom: rem(25),
        marginTop: rem(10),
        color: '#474975'
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

    panel: {
        display: 'flex',
        justifyContent: 'flex-start',
        '& >span': {
            width: '100%',
            textAlign: 'left',

        },

    },
};

export const useUserStyles = createUseStyles(styles);
