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

const QRComponent = ({operationId, qrCode, buttonLink, handleClose, expireDate, onExpire}: any) => {
    const [status, setStatus] = useState<string | null>(null);
    const [signedDocument, setSignedDocument] = useState<{ name: string, url: string } | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
    const translate = useLocalization();
    const {qrMainContent} = useQRStyles();
    const [width, setWidth] = useState(0);
    const [timeEnd, setTimeEnd] = useState(false);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    };

    const [secondsLeft, setSecondsLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(true);

    // Initialize the countdown based on expireDate
    useEffect(() => {
        const now = new Date();
        const expire = new Date(expireDate);
        const diffInSeconds = Math.floor((expire.getTime() - now.getTime()) / 1000);

        if (diffInSeconds <= 0) {
            setSecondsLeft(0);
            setIsRunning(false);
            onExpire?.();
        } else {
            setSecondsLeft(diffInSeconds);
            setIsRunning(true);
        }
    }, [expireDate, onExpire]);

    // Countdown logic
    useEffect(() => {
        if (!isRunning || secondsLeft <= 0) return;

        const interval = setInterval(() => {
            setSecondsLeft(prev => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, secondsLeft]);

    // When countdown reaches 0
    useEffect(() => {
        if (secondsLeft === 0 && isRunning) {
            setIsRunning(false);
            onExpire?.();
        }
    }, [secondsLeft, isRunning, onExpire]);

    const formatTime = (secs: number) => {
        const days = Math.floor(secs / (3600 * 24));
        const hours = Math.floor((secs % (3600 * 24)) / 3600);
        const minutes = Math.floor((secs % 3600) / 60);
        const seconds = secs % 60;

        return `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
