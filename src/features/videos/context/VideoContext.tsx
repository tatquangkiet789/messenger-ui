import SOCKET_EVENT from '@src/constants/socket';
import socketClient from '@src/lib/socketClient';
import {
    FC,
    ReactNode,
    RefObject,
    createContext,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import SimplePeer, { Instance, SignalData } from 'simple-peer';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { toast } from 'react-toastify';

type VideoProviderProps = {
    children: ReactNode;
};

export interface IVideoContext {
    stream: MediaStream;
    isAccepted: boolean;
    callDetail: CallDetail;
    myVideoRef: RefObject<HTMLVideoElement>;
    userVideoRef: RefObject<HTMLVideoElement>;
    receiverSocketID: string;
    callerDetail: CallerDetail;
    handleSetCallerDetailContext: (callerDetail: CallerDetail) => void;
    handleCallUserContext: () => void;
    handleSendCallerAndReceiverIDContext: ({
        receiverID,
        senderID,
    }: {
        receiverID: number;
        senderID: number;
    }) => void;
    handleInitCallContext: () => void;
    handleAnswerCallContext: () => void;
}

export const VideoContext = createContext<IVideoContext>(null as any);

type CallerDetail = {
    socketID: string;
    name: string;
    avatar: string;
};

type CallDetail = {
    isReceivedCall: boolean;
    callerDetail: CallerDetail;
    signalData: SignalData;
};

const VideoProvider: FC<VideoProviderProps> = ({ children }) => {
    const [stream, setStream] = useState<MediaStream>(null as any);
    const [receiverSocketID, setReceiverSocketID] = useState('');
    const [callerDetail, setCallerDetail] = useState<CallerDetail>(null as any);
    const [callDetail, setCallDetail] = useState<CallDetail>(null as any);
    const [isAccepted, setIsAccepted] = useState(false);

    const { currentUser } = useAppSelector((state) => state.auth);

    const myVideoRef = useRef<HTMLVideoElement>(null);
    const userVideoRef = useRef<HTMLVideoElement>(null);
    const connectionRef = useRef<Instance | null>(null);

    useEffect(() => {
        // Đây là bên người nhận cuộc gọi
        socketClient.on(SOCKET_EVENT.RECEIVED_CALL, (data) => {
            const { signalData, callerDetail } = data;
            setCallDetail({ signalData, callerDetail, isReceivedCall: true });
            toast(
                () => (
                    <div>
                        <p>{callerDetail.name} đang gọi cho bạn</p>
                        <div className={`flex items-center justify-center gap-5`}>
                            <button>Trả lời</button>
                            <button>Từ chối</button>
                        </div>
                    </div>
                ),
                { autoClose: false },
            );
        });

        return () => {
            socketClient.off(SOCKET_EVENT.RECEIVED_CALL);
        };
    }, []);

    useEffect(() => {
        if (!currentUser) return;

        // Đây là bên người gọi
        socketClient.on(SOCKET_EVENT.RECEIVE_VIDEO_CALL_RECEIVER_ID, (data) => {
            const { callerSocketID, receivedCallSocketID } = data;
            setReceiverSocketID(receivedCallSocketID);
            setCallerDetail({
                name: `${currentUser.lastName} ${currentUser.firstName}`,
                avatar: currentUser.avatar,
                socketID: callerSocketID,
            });
        });

        return () => {
            // socketClient.off(SOCKET_EVENT.RECEIVED_CALL);
            socketClient.off(SOCKET_EVENT.RECEIVE_VIDEO_CALL_RECEIVER_ID);
        };
    }, [currentUser]);

    const handleInitCallContext = () => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
            setStream(stream);
            if (myVideoRef.current) myVideoRef.current.srcObject = stream;
        });
    };

    const handleSetCallerDetailContext = useCallback((callerDetail: CallerDetail) => {
        setCallerDetail(callerDetail);
    }, []);

    const handleSendCallerAndReceiverIDContext = useCallback(
        ({ receiverID, senderID }: { receiverID: number; senderID: number }) => {
            socketClient.emit(SOCKET_EVENT.SEND_VIDEO_CALL_RECEIVER_ID, { receiverID, senderID });
        },
        [],
    );

    const handleCallUserContext = useCallback(() => {
        const peer = new SimplePeer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data: SignalData) => {
            socketClient.emit(SOCKET_EVENT.CALL_USER, {
                receiverSocketID,
                signalData: data,
                callerDetail,
            });
        });
        peer.on('stream', () => {
            if (userVideoRef.current) userVideoRef.current.srcObject = stream;
        });

        socketClient.on(SOCKET_EVENT.CALL_ACCEPTED, (signalData: SignalData) => {
            setIsAccepted(true);
            peer.signal(signalData);
        });

        if (connectionRef.current) connectionRef.current = peer;
    }, [callerDetail, receiverSocketID, stream]);

    const handleAnswerCallContext = useCallback(() => {
        setIsAccepted(true);

        const { signalData } = callDetail;
        const { socketID } = callerDetail;

        const peer = new SimplePeer({ initiator: false, trickle: false, stream });

        peer.on('signal', (signalData: SignalData) => {
            socketClient.emit(SOCKET_EVENT.ANSWER_CALL, {
                callerSocketID: socketID,
                signalData,
            });
        });
        peer.on('stream', (stream: MediaStream) => {
            if (userVideoRef.current) userVideoRef.current.srcObject = stream;
        });

        peer.signal(signalData);

        connectionRef.current = peer;
    }, [callDetail, callerDetail, stream]);

    return (
        <VideoContext.Provider
            value={{
                stream,
                callDetail,
                isAccepted,
                myVideoRef,
                userVideoRef,
                receiverSocketID,
                callerDetail,
                handleSetCallerDetailContext,
                handleCallUserContext,
                handleSendCallerAndReceiverIDContext,
                handleInitCallContext,
                handleAnswerCallContext,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};

export default VideoProvider;
