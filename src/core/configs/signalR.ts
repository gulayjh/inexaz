import * as signalR from "@microsoft/signalr";
import {API} from './api.config';
const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl( `${API.signalR}/`) // Replace with your SignalR hub URL
    .withAutomaticReconnect() // Optional: Automatically reconnect on disconnect
    .configureLogging(signalR.LogLevel.Information)
    .build();

const startConnection = async () => {
    try {
        await hubConnection.start();
        console.log("SignalR Connected");
    } catch (err) {
        console.error("SignalR Connection Error:", err);
        setTimeout(startConnection, 5000); // Retry after 5 seconds
    }
};

// Start the connection
startConnection();

export { hubConnection };
