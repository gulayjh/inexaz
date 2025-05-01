import {createUseStyles} from 'react-jss';
import fonts from '../../assets/styles/abstracts/fonts';
import {rem} from '../../assets/styles/abstracts/functions';
import colors from '../../assets/styles/abstracts/color';
import {breakpoint} from '../../assets/styles/abstracts/mixins';


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

        },
        [breakpoint(1200)]: {
            '& span:nth-child(1)': {
                width: '100%',
                maxWidth: rem(100),
            }

        },
    },

    bold: {
        fontFamily: `${fonts.fontBold} !important`,
        lineHeight: `${rem(32)} !important`,
        display: 'inline-block',
    },
    icons: {
        fontFamily: `${fonts.fontBold} !important`,
        lineHeight: `${rem(32)} !important`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& >span': {
            flexBasis: '50%',
            width: '100%',
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
    panel: {
        display: 'flex',
        justifyContent: 'flex-start',
        '& >span': {
            width: '100%',
            textAlign: 'left',

        },
        '& >span:nth-child(1)': {
            width: rem(200),

        },
        [breakpoint(1200)]: {
            '& span:nth-child(1)': {
                width: rem(50)
            }

        },
    },
    panelItem: {
        flexBasis: '60%',
        '& >div': {
            display:'inline-block',
            width:'100%',
            maxWidth:rem(150),
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }
    },
    listItemMobile:{
        fontFamily: fonts.fontMain,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: {
            top: rem(5),
            bottom: rem(5),
            left: rem(10)
        },
        '& >span:nth-child(1)': {
            display: 'inline-block',
            wordBreak: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: rem(180),
            whiteSpace: 'nowrap',
            flexBasis:'90%',
            width:'100%',

        },
        '& div': {
            display: 'flex',
            justifyContent: 'space-between',
            width: rem(80),
            '& span': {
                cursor: 'pointer'

            }

        },
    }

};

export const useSigningsStyles = createUseStyles(styles);
