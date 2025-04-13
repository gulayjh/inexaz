import {createUseStyles} from 'react-jss';
import fonts from '../../assets/styles/abstracts/fonts';
import {rem} from '../../assets/styles/abstracts/functions';


const styles = {

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
            }
        },
        '& h5': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: rem(225)
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
        fontFamily: fonts.fontBold,
        lineHeight: rem(32),
        fontSize: rem(18),
        marginBottom: rem(25),
        marginTop: rem(10),
        color: '#474975'
    },

};

export const useUserStyles = createUseStyles(styles);
