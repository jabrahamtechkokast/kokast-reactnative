import TcpSocket from 'react-native-tcp-socket';

function sendTelnetCommand(cmd) {
    // Create a new socket connection
    const client = TcpSocket.createConnection({ port: 23, host: '192.168.1.17' }, () => {
        // Send the command
        console.log("Sending command:", cmd);
        client.write(cmd);
        client.destroy(); // Close the connection after sending
    });
}

export default sendTelnetCommand;
