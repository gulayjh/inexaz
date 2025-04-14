import {createUseStyles} from 'react-jss';
import {rem} from '../../../assets/styles/abstracts/functions';
import fonts from '../../../assets/styles/abstracts/fonts';


const styles = {
    qrMainContent: {

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        '& button': {
            marginTop: rem(30),
            width: '60%',
        },
        '& h2': {
            lineHeight: rem(32),
            fontSize: rem(18),
            fontFamily: fonts.fontBold,
            fontWeight: 700,
            marginBottom: rem(25),
            marginTop: rem(10),
            color: '#474975'
        }
    },

};

export const useQRStyles = createUseStyles(styles);