import colors from '../../assets/styles/abstracts/color';
import {rem} from '../../assets/styles/abstracts/functions';
import {createUseStyles} from 'react-jss';
import sizes from '../../assets/styles/abstracts/sizes';
import fonts from '../../assets/styles/abstracts/fonts';

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
        marginBottom: rem(15),
        flexDirection: 'column',
        justifyContent: 'center',
        width: rem(200),
        height: rem(150),
        backgroundColor: 'white',
        borderRadius: rem(10),
        padding: rem(10),
        boxShadow: '0px 20px 20px rgb(126 142 177 / 12%)',
        '& span': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: rem(100),
            '& svg': {
                transform: 'scale(3)'
            }
        },
        '& h5': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: rem(180)
        }

    }

};

export const useUploadStyles = createUseStyles(styles);
