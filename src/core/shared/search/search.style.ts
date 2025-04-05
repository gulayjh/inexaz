import {createUseStyles} from 'react-jss';

const styles = {
    search: {
        width: '100%',
        '& span:first-child': {
            borderRadius: '32px !important',
        }
    },
    button: {
        cursor: 'pointer',
        border: 'none !important'
    }

};

export const useSearchStyles = createUseStyles(styles);