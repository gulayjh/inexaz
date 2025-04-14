import './qr.style';
import {useCallback, useEffect, useState} from 'react';
import {Button, message as antdMessage} from 'antd';
import signalRService from '../../configs/signalR';
import {base64ToBlobUrl} from '../../helpers/base64-to-blob';
import {goTo} from '../../../router/routes';
import useLocalization from '../../../assets/lang';
import {useModalStyles} from '../modal/modal.style';
import {useQRStyles} from './qr.style';
import {errorToast, successToast} from '../toast/toast';

const QRComponent = ({operationId, qrCode, buttonLink, handleClose}: any) => {
    const [status, setStatus] = useState<string | null>(null);
    const [signedDocument, setSignedDocument] = useState<{ name: string, url: string } | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
    const translate = useLocalization();
    const {qrMainContent} = useQRStyles();
    const [width, setWidth] = useState(0);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    };


    const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes = 300 seconds
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        if (!isRunning || secondsLeft <= 0) return;

        const interval = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, secondsLeft]);

    const formatTime = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handlePause = () => setIsRunning(false);
    const handleResume = () => setIsRunning(true);
    const handleReset = () => {
        setSecondsLeft(300);
        setIsRunning(false);
    };


    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);
    useEffect(() => {
        signalRService.onGetSuccessStatus(() => {
            setStatus('Success');
            successToast('Document signed successfully.');
            handleClose();
        });

        signalRService.onGetErrorStatus((errorMsg: string) => {
            setStatus('Error');
            errorToast(`Error: ${errorMsg}`);
            handleClose();
        });

        signalRService.onGetSignedDocument((documentName: string, documentUrl: string) => {
            setSignedDocument({name: documentName, url: documentUrl});
            antdMessage.success(`Signed document received: ${documentName}`);
        });
        signalRService.startConnection(operationId, () => {
            setConnectionStatus('connected');
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
                    {width > 1024 ?
                        <>
                            <img src={base64ToBlobUrl(qrCode)}/>
                            <h2>{formatTime(secondsLeft)}</h2>
                        </>
                        :
                        <Button type="primary" onClick={() => {
                            window.location.href = buttonLink;
                        }}>
                            <span>{translate('sign')}</span>
                        </Button>
                    }
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
