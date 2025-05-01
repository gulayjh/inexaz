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
import ScanIcon from '../../../assets/images/icons/sign';

const QRComponent = ({operationId, qrCode, buttonLink, handleClose, onSuccess}: any) => {
    const [status, setStatus] = useState<string | null>(null);
    const [signedDocument, setSignedDocument] = useState<{ name: string, url: string } | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
    const translate = useLocalization();
    const {qrMainContent, steps} = useQRStyles();
    const [width, setWidth] = useState(0);
    const [timeEnd, setTimeEnd] = useState(false);

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    };

    const [secondsLeft, setSecondsLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(true);

/*    useEffect(() => {
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
    }, [expireDate, onExpire]);*/
/*
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
    };*/

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);
    useEffect(() => {
        signalRService.onGetSuccessStatus(() => {
            setStatus('Success');
            handleClose();
            onSuccess();
        });

        signalRService.onGetErrorStatus((errorMsg: string) => {
            setStatus('Error');
            errorToast(`Error: ${errorMsg}`);
            handleClose();
        });

        signalRService.onGetSignedDocument((documentName: string, documentUrl: string) => {
            setSignedDocument({name: documentName, url: documentUrl});
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
                            <div className={steps}>
                                {
                                    translate('login_steps', {icon: <ScanIcon className="mx-10"/>})
                                }
                            </div>
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

        </div>
    );
};

export default QRComponent;
