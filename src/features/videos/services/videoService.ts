import SOCKET_EVENT from '@src/constants/socket';
import socketClient from '@src/lib/socketClient';

export const sendReceiverIDService = ({
    receiverID,
    senderID,
}: {
    receiverID: number;
    senderID: number;
}) => {
    console.log(`Sending receiverID: [${receiverID}] using socket`);
    socketClient.emit(SOCKET_EVENT.SEND_VIDEO_CALL_RECEIVER_ID, { receiverID, senderID });
};
