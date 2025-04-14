import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {useUserStyles} from './sessions.style';
import {useParams} from 'react-router-dom';
import {useGetSession} from './actions/queries';
import {DeleteIcon, FileIcon, LookUpIcon} from '../../assets/images/icons/sign';
import useLocalization from '../../assets/lang';
import {Button} from 'antd';
import {successToast} from '../../core/shared/toast/toast';
import {useQueryClient} from 'react-query';
import {useSessionStart} from './actions/mutations';
import ModalComponent from '../../core/shared/modal/modal.component';
import QRComponent from '../../core/shared/qr/qr.component';


function SessionComponent() {

    const {mainContent, title, list, listItem, button} = useUserStyles();

    const translate = useLocalization();
    const queryClient = useQueryClient();

    const {id} = useParams<{ id: string }>();

    const {data, isLoading} = useGetSession(id);
    const [showModal, setShowModal] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [buttonLink, setButtonLink] = useState('');

    useEffect(() => {
        if (data && data.status === 2) {
            setShowModal(true);
            setQrCode(data?.operation?.qrCode);
            setButtonLink(data?.operation?.buttonLink);
        } else {
            setShowModal(false);
        }
    }, [data]);

    const onSubmitSuccess = useCallback(() => {
        successToast('Uğurlu əməliyyat!');
        queryClient.invalidateQueries(['getSessionByLink']);

    }, []);

    const {mutate} = useSessionStart(() => {
        onSubmitSuccess();
    });
    console.log(data);
    const onSubmit = useCallback((link: string) => {
        mutate(link);

    }, []);

    return (
        <div className={mainContent}>
            <h3 className={title}>{translate('session_title')}</h3>

            {data && data?.documents && data.documents.length > 0 && (
                <div>
                    <div className={list}>
                        {data.documents.map((file: any, index: number) => (
                            <div className="col-lg-4 col-md-6 col-sm-12" key={file.uid || index}>
                                <div className={listItem} title={file.name}>
                                    <span><FileIcon/></span>
                                    <h5>{file.name}</h5>

                                    <a className={button} href={file?.sourceUrl} target="_blank"
                                       rel="noopener noreferrer">
                                        <LookUpIcon/>
                                    </a>

                                </div>
                            </div>
                        ))}
                    </div>
                    <Button disabled={data.status === 2} style={{width: '250px', marginLeft: '15px', marginTop: '30px'}}
                            type="primary" onClick={() => {
                        onSubmit(data?.dynamicLinkPart);
                    }}>
                        {translate('submit')}
                    </Button>
                    {qrCode && buttonLink ?
                        <ModalComponent showModal={showModal} handleClose={() => setShowModal(false)}>
                            <QRComponent operationId={data?.operation?.id} qrCode={qrCode}
                                         buttonLink={buttonLink} handleClose={() => setShowModal(false)} />

                        </ModalComponent>
                        : null}
                </div>
            )}
        </div>
    );
}

export default SessionComponent;
