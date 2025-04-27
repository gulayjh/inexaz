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
    steps: {
        marginTop: rem(15),
        '& ul': {
            display: 'flex',
            flexDirection: 'column',
            gap: rem(25)
        },
        '& li': {
            display: 'flex',
            alignItems: 'center',
            fontSize: rem(16),
            '&::before': {
                content: '""',
                width: rem(20),
                height: rem(20),
                borderRadius: '50%',
                backgroundColor: '#474975',
                marginRight: rem(10),
                flexShrink: 0

            },
            '& strong': {
                fontWeight: 500,
                marginRight: rem(7),
                flexShrink: 0
            }
        }
    },

};

export const useQRStyles = createUseStyles(styles);