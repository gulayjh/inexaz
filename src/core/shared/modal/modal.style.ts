import {createUseStyles} from 'react-jss';
import colors from '../../../assets/styles/abstracts/color';
import fonts from '../../../assets/styles/abstracts/fonts';
import {rem} from '../../../assets/styles/abstracts/functions';
import {breakpoint} from '../../../assets/styles/abstracts/mixins';
import sizes from '../../../assets/styles/abstracts/sizes';

const styles = {
    modal: {

        padding: {
            left: 0,
            right: 0,
            top: 30,
            bottom: 50
        },
  //      minHeight: 'calc(100vh - 700px)',

        //overflowY: 'scroll',
    },

};

export const useModalStyles = createUseStyles(styles);