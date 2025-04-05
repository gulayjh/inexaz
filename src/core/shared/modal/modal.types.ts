import {ReactNode} from 'react';

export interface IModalTypes {
    title?: string;
    showModal: boolean;
    showLogo?: boolean;
    handleClose?: () => void;
    children?: ReactNode;
    footer?: ReactNode;
    scroll?: boolean;
}
