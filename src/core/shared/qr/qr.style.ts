import {createUseStyles} from 'react-jss';
import {rem} from '../../../assets/styles/abstracts/functions';


const styles = {
    qrMainContent: {

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        '& button':{
            marginTop: rem(30),
            width: '60%',
        }
    },

};

export const useQRStyles = createUseStyles(styles);