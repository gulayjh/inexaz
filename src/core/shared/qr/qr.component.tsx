import './qr.style';
import {useEffect, useState} from "react";
import {hubConnection} from "../../configs/signalR";
import {Button} from 'antd';

const QRComponent = ({sessionId}: any) => {
    const [messages, setMessages] = useState<any[]>([]);
    useEffect(() => {
        if (!sessionId) return;

        hubConnection.off("ReceiveMessage");

        hubConnection.on("ReceiveMessage", (message: any) => {
            setMessages((prevMessages) => [...prevMessages, {message}]);
        });

        const startAndRegister = async () => {
            try {
                if (hubConnection.state !== "Connected") {
                    await hubConnection.start();
                }
                await hubConnection.invoke("RegisterOperation", sessionId);
            } catch (err) {
                console.error("SignalR Connection or Registration Error:", err);
            }
        };

        startAndRegister();

        return () => {
            hubConnection.off("ReceiveMessage");
        };
    }, [sessionId]);

    return (
        <div>
            <h2>QR Component</h2>
            <Button onClick={() => console.log(messages)}>Show Messages</Button>
        </div>
    );
};

export default QRComponent;