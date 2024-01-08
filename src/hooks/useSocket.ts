import SOCKET_EVENT from '@src/constants/socket';
import { PostNotificationResponse } from '@src/features/notifications/models/notification';
import { User } from '@src/features/users/models/user';
import socketClient from '@src/lib/socketClient';
import { useCallback } from 'react';

export default function useSocket() {
    const handleAddSocketUser = useCallback((user: User) => {
        socketClient.emit(SOCKET_EVENT.NEW_USER, user);
    }, []);

    const handleReceivePostNotification = useCallback(
        (postNotification: PostNotificationResponse) => {
            console.log('Post Notification via Socket: ', postNotification);
        },
        [],
    );

    return { handleAddSocketUser, handleReceivePostNotification };
}
