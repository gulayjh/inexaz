import React, {useCallback, useEffect, useState} from 'react';
import {useUserStyles} from './sessions.style';
import {useParams} from 'react-router-dom';
import {useGetSession} from './actions/queries';
import {Active, FileIcon, LookUpIcon, Pending, Signed} from '../../assets/images/icons/sign';
import useLocalization from '../../assets/lang';
import {Button, Tooltip} from 'antd';
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
        setQrCode(data?.operation?.qrCode);
        setButtonLink(data?.operation?.buttonLink);
        if (data && data.status === 2) {
            setShowModal(true);
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
    const onSubmit = useCallback((link: string) => {
        mutate(link);

    }, []);

    return (
        <div className={mainContent}>
            <div className={title}>

                <h3>{translate('session_title')}</h3>
                {data && data.status ?
                    <h5 className={title}>{translate('session_status')}: {data.status === 1 ?
                        <span>
                            <span>Gözləmədə</span><Pending/>
                        </span>
                        : data.status === 2 ?
                            <span>
                            <span>Aktiv</span><Active/>
                        </span>
                            :
                            <span>
                            <span>İmzalanmış</span><Signed/>
                        </span>
                    }</h5>
                    : null}
            </div>
            {
                data && data?.documents && data.documents.length > 0 && (
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
                        {data.status !== 3 ?
                            <Button
                                style={{width: '250px', marginLeft: '15px', marginTop: '30px'}}
                                type="primary"
                                onClick={() => {
                                    if (data.status === 2) {
                                        setShowModal(true);
                                    } else {
                                        onSubmit(data?.dynamicLinkPart);
                                    }
                                }}
                            >
                                {translate('sign')}
                            </Button> : null}
                        {qrCode && buttonLink ?
                            <ModalComponent showModal={showModal} handleClose={() => setShowModal(false)}>
                                <QRComponent operationId={data?.dynamicLinkPart} qrCode={qrCode}
                                             buttonLink={buttonLink} handleClose={() => setShowModal(false)}/>

                            </ModalComponent>
                            : null}
                    </div>
                )}
        </div>
    );
}

export default SessionComponent;