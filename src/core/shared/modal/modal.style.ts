import {createUseStyles} from 'react-jss';


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