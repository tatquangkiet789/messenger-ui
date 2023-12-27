import { SOCKET_URL } from '@src/constants/endpoints';
import { io } from 'socket.io-client';

// const socketClient = io(SOCKET_URL);
const socketClient = io('http://localhost:8080');

export default socketClient;
