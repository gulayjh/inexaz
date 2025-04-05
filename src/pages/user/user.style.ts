import {createUseStyles} from 'react-jss';
import fonts from '../../assets/styles/abstracts/fonts';
import {rem} from '../../assets/styles/abstracts/functions';


const styles = {


    list: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        '& span': {
            cursor: 'pointer',
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

};

export const useUserStyles = createUseStyles(styles);
