// signalRService.ts
import {
    HubConnectionBuilder,
    HubConnection,
    HttpTransportType,
    HubConnectionState,
} from '@microsoft/signalr';
import {API} from './api.config';

class SignalRService {
    connection: HubConnection | null = null;
    operationId: string;

    constructor() {
        const pathSegments = window.location.pathname.split('/');
        this.operationId = pathSegments[pathSegments.length - 1];

        this.connection = new HubConnectionBuilder()
            .withUrl('wss://innexbackend.up.railway.app/signingHub', {
                transport: HttpTransportType.WebSockets,
                skipNegotiation: true
            })
            .withAutomaticReconnect()
            .build();

        this.setupReconnection();
    }

    setupReconnection() {
        if (this.connection) {
            this.connection.onreconnected(() => {
                this.startConnection(this.operationId);
            });
        }
    }

    startConnection(operationId: string, onConnected?: () => void) {
        this.operationId = operationId;
        if (this.connection && this.getConnectionState() !== HubConnectionState.Connected) {
            this.connection
                .start()
                .then(() => {
                    console.log('SignalR Connected');
                    this.connectToSigningHub(this.operationId);
                    onConnected?.(); // ← Trigger the callback
                })
                .catch((err) => console.error('Connection error:', err));
        }
    }

    connectToSigningHub(operationId: string) {
        console.log(operationId);

        if (this.connection && this.getConnectionState() === HubConnectionState.Connected) {
            this.connection.invoke('Connect', operationId)
                .catch(err => console.error('Error invoking Connect:', err));
        }
    }

    disconnectFromSigningHub(operationId: string) {
        if (this.connection && this.getConnectionState() === HubConnectionState.Connected) {
            this.connection.invoke('Disconnect', operationId)
                .then(() => this.stopConnection())
                .catch((e) => console.log(e));
        }
    }

    stopConnection() {
        if (this.connection) {
            this.connection
                .stop()
                .catch((err) => console.error('Error during disconnection:', err));
        }
    }

    getConnectionState(): HubConnectionState | null {
        return this.connection ? this.connection.state : null;
    }

    // --- Listeners for server-to-client events ---
    onGetSuccessStatus(callback: () => void) {
        this.connection?.on('GetSuccessStatus', callback);
    }

    onGetErrorStatus(callback: (message: string) => void) {
        this.connection?.on('GetErrorStatus', callback);
    }

    onGetSignedDocument(callback: (documentName: string, documentUrl: string) => void) {
        this.connection?.on('GetSignedDocument', callback);
    }
}

const signalRService = new SignalRService();
export default signalRService;
