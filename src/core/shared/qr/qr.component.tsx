import './qr.style';
import {useCallback, useEffect, useState} from 'react';
import {Button, message as antdMessage} from 'antd';
import signalRService from '../../configs/signalR';
import {base64ToBlobUrl} from '../../helpers/base64-to-blob';
import {goTo} from '../../../router/routes';
import useLocalization from '../../../assets/lang';
import {useModalStyles} from '../modal/modal.style';
import {useQRStyles} from './qr.style';

const QRComponent = ({operationId, qrCode, buttonLink}: any) => {
    const [status, setStatus] = useState<string | null>(null);
    const [signedDocument, setSignedDocument] = useState<{ name: string, url: string } | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
    const translate = useLocalization();
    const {qrMainContent} = useQRStyles();

    useEffect(() => {
        signalRService.startConnection(operationId, () => {
            setConnectionStatus('connected');
        });
        signalRService.onGetSuccessStatus(() => {
            setStatus('Success');
            antdMessage.success('Document signed successfully.');
        });

        signalRService.onGetErrorStatus((errorMsg: string) => {
            setStatus('Error');
            antdMessage.error(`Error: ${errorMsg}`);
        });

        signalRService.onGetSignedDocument((documentName: string, documentUrl: string) => {
            setSignedDocument({name: documentName, url: documentUrl});
            antdMessage.success(`Signed document received: ${documentName}`);
        });

        // Cleanup on unmount
        return () => {
            signalRService.disconnectFromSigningHub(operationId);
        };
    }, [operationId]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            signalRService.disconnectFromSigningHub(operationId);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [operationId]);



    return (
        <div>
            {connectionStatus === 'connected' ?
                <div className={qrMainContent}>
                    <img src={base64ToBlobUrl(qrCode)}/>
                    <Button type='primary' onClick={() => {
                        window.location.href = buttonLink;
                    }}>
                        <span>{translate('sign')}</span>
                    </Button>
                </div>
                : null}
            {signedDocument && (
                <div>
                    <p>Document: {signedDocument.name}</p>
                    <a href={signedDocument.url} target="_blank" rel="noopener noreferrer">Open Document</a>
                </div>
            )}

        </div>
    );
};

export default QRComponent;
