import './modal.style';
import {Modal} from 'antd';
import {useModalStyles} from './modal.style';
import {IModalTypes} from './modal.types';

const ModalComponent = ({title, showModal, handleClose, footer, children}: IModalTypes) => {
    const {modal} = useModalStyles();

    return (
        <Modal width={750} title={title} open={showModal} onCancel={handleClose} closable={handleClose ? true : false}
               maskClosable={false}
               footer={null}
               centered
            // bodyStyle={scroll ? {overflowY: 'scroll'} : {overflowY: 'auto'}}
        >

            <div className={modal}>
                {children}
            </div>
        </Modal>
    );
};

export default ModalComponent;
