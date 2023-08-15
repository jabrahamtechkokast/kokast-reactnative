import { useState } from 'react';
import TcpSocket from 'react-native-tcp-socket';

const [response, setResponse] = useState('');

export default function sendTelnetCommand(cmd: string){
    // Create a new socket connection
    const client = TcpSocket.createConnection({ port: 23, host: '192.168.1.17' }, () => {
      // Send the command
      console.log(cmd);
      client.write(cmd);

      // Listen for data from the server
      client.on('data', (data) => {
        setResponse(data.toString());
        client.destroy(); // Close the connection
      });

      client.on('error', (error) => {
        console.error(error);
        client.destroy();
      });
    });
};