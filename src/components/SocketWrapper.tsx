import SOCKET_EVENT from '@src/constants/socket';
import useAuth from '@src/features/auth/hooks/useAuth';
import { useSocket } from '@src/hooks';
import socketClient from '@src/lib/socketClient';
import { ReactNode, memo, useEffect } from 'react';

type SocketWrapperProps = {
    children: ReactNode;
};

const SocketWrapper = memo(function SocketWrapper({ children }: SocketWrapperProps) {
    const { currentUser } = useAuth();
    const { handleReceivePostNotification } = useSocket();

    useEffect(() => {
        console.log(`Check currentUser in SocketWrapper:useEffect`);
        if (!currentUser) return;
        console.log(`Send currentUser via Socket`);
        socketClient.emit(SOCKET_EVENT.NEW_USER, currentUser);

        // Receive Post Notification
        socketClient.on(SOCKET_EVENT.SEND_POST_NOTIFICATION, handleReceivePostNotification);

        return () => {
            socketClient.off(SOCKET_EVENT.SEND_POST_NOTIFICATION, handleReceivePostNotification);
        };
    }, [currentUser, handleReceivePostNotification]);

    return <>{children}</>;
});

export default SocketWrapper;
