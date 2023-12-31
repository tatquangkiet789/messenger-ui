const SOCKET_EVENT = {
    RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
    NEW_USER: 'NEW_USER',

    SEND_ADD_FRIEND_NOTIFICATION: 'SEND_ADD_FRIEND_NOTIFICATION',

    SEND_VIDEO_CALL_RECEIVER_ID: 'SEND_VIDEO_CALL_RECEIVER_ID',
    RECEIVE_VIDEO_CALL_RECEIVER_ID: 'RECEIVE_VIDEO_CALL_RECEIVER_ID',
    ANSWER_CALL: 'ANSWER_CALL',
    CALL_USER: 'CALL_USER',
    CALL_ACCEPTED: 'CALL_ACCEPTED',
    SEND_CALLER_DETAIL: 'SEND_CALLER_DETAIL',
    RECEIVED_CALL: 'RECEIVED_CALL',
    END_CALL: 'END_CALL',
    RECEIVED_END_CALL: 'RECEIVED_END_CALL',
};

export default SOCKET_EVENT;
