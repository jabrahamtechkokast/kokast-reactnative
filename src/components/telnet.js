import AsyncStorage from '@react-native-async-storage/async-storage';
import TcpSocket from 'react-native-tcp-socket';
import GenericDataStorage from '../store/GenericDataStorage';
import { hipCodeData } from '../store/Types';
import { useState } from 'react';


export  default async function sendTelnetCommand(cmd) {
    try {
        const hipCodeString = await AsyncStorage.getItem("HipKey");
        const hipCodeData = hipCodeString ? JSON.parse(hipCodeString) : null;
        const hipCode = hipCodeData ? hipCodeData.hipCode : null;

        if (hipCode) {
            // ... rest of the function
            console.log(hipCode);
            //const HipCode = data.hipCode
              
            // Create a new socket connection
            const client = TcpSocket.createConnection({ port: 23, host: hipCode }, () => {
                // Send the command
                console.log("Sending command:", cmd);
                client.write(cmd);
                client.destroy(); // Close the connection after sending
            });
        
        } else {
            console.error("HipCode not found in storage");
        }
    } catch (error) {
        console.error("Error fetching HipCode:", error);
    }
}

// function sendTelnetCommand(cmd) {
    
//     console.log(data.hipCode);
//     //const HipCode = data.hipCode
      
//     // Create a new socket connection
//     const client = TcpSocket.createConnection({ port: 23, host: HipCode }, () => {
//         // Send the command
//         console.log("Sending command:", cmd);
//         client.write(cmd);
//         client.destroy(); // Close the connection after sending
//     });
// }

// export default sendTelnetCommand;
