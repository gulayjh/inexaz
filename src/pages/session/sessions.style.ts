import {createUseStyles} from 'react-jss';
import fonts from '../../assets/styles/abstracts/fonts';
import {rem} from '../../assets/styles/abstracts/functions';
import {breakpoint} from '../../assets/styles/abstracts/mixins';


const styles = {
    mainContent: {
        padding: rem(50),
    },

    list: {
        display: 'flex',
        flexWrap: 'wrap',
        [breakpoint(1200)]: {
            '& >div': {
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: rem(5),
            }
        }
    },
    listItem: {
        display: 'flex',
        position: 'relative',
        marginBottom: rem(15),
        flexDirection: 'column',
        justifyContent: 'center',
        width: rem(180),
        height: rem(180),
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
            }
        },
        '& h5': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: rem(150)
        },
        [breakpoint(1200)]: {
            width: rem(100),
            height: rem(100),
            '& span:nth-child(1)': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: rem(50),
                '& svg': {
                    transform: 'scale(1) !important'
                },
            },
            '& svg': {
                transform: 'scale(1) !important'
            },
            '& h5': {

                width: rem(80)
            },
        },
    },


    button: {
        width: `${rem(10)} !important`,
        height: `${rem(10)} !important`,
        position: 'absolute',
        top: rem(10),
        right: rem(25),
        cursor: 'pointer'
    },
    title: {
        '& h5': {
            display: 'flex',
            alignItems: 'center',
            fontFamily: fonts.font,
            lineHeight: rem(24),
            fontSize: rem(16),
            marginBottom: rem(15),
            marginTop: rem(10),
            color: '#474975',
            '& >span': {
                display: 'flex',
                alignItems: 'center',
                paddingLeft: rem(5),
                '& >span': {
                    paddingRight: rem(10),
                }
            }
        },
        '& h3': {
            fontFamily: fonts.fontBold,
            lineHeight: rem(24),
            fontSize: rem(18),
            marginBottom: rem(15),
            color: '#474975',
        },
    },

};

// @ts-ignore
export const useUserStyles = createUseStyles(styles);
