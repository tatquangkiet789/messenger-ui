import SOCKET_EVENT from '@src/constants/socket';
import useAuth from '@src/features/auth/hooks/useAuth';
import socketClient from '@src/lib/socketClient';

export default function useSocket() {
    const { currentUser } = useAuth();

    function handleAddUser() {
        socketClient.emit(SOCKET_EVENT.NEW_USER, currentUser.id);
    }

    return { handleAddUser };
}
