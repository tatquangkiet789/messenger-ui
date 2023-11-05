import SOCKET_EVENT from '@src/constants/socket';
import socketClient from '@src/lib/socketClient';
import { FC, ReactNode, createContext, useCallback, useEffect, useRef, useState } from 'react';
import Peer, { SignalData } from 'simple-peer';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { IVideoContext, CallerDetail, CallDetail } from '../constants/videoConstant';

type VideoProviderProps = {
    children: ReactNode;
};

export const VideoContext = createContext<IVideoContext>(null as any);

const VideoProvider: FC<VideoProviderProps> = ({ children }) => {
    const [stream, setStream] = useState<MediaStream>(null as any);
    const [receiverSocketID, setReceiverSocketID] = useState('');
    const [callerDetail, setCallerDetail] = useState<CallerDetail>(null as any);
    const [callDetail, setCallDetail] = useState<CallDetail>(null as any);
    const [isAccepted, setIsAccepted] = useState(false);
    const [isEnded, setIsEnded] = useState(false);

    const { currentUser } = useAppSelector((state) => state.auth);

    const myVideoRef = useRef<HTMLVideoElement>(null);
    const userVideoRef = useRef<HTMLVideoElement>(null);
    const connectionRef = useRef<Peer.Instance>(null as any);

    useEffect(() => {
        // Đây là bên người nhận cuộc gọi
        socketClient.on(SOCKET_EVENT.RECEIVED_CALL, (data) => {
            console.log('Đã nhận đc callDetail');
            const { signalData, callerDetail } = data;
            setCallDetail({ signalData, callerDetail, isReceivedCall: true });
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
            socketClient.off(SOCKET_EVENT.RECEIVE_VIDEO_CALL_RECEIVER_ID);
        };
    }, [currentUser]);

    const handleSendCallerAndReceiverIDContext = useCallback(
        ({ receiverID, senderID }: { receiverID: number; senderID: number }) => {
            socketClient.emit(SOCKET_EVENT.SEND_VIDEO_CALL_RECEIVER_ID, { receiverID, senderID });
        },
        [],
    );

    const handleCallUserContext = () => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (signalData: SignalData) => {
            socketClient.emit(SOCKET_EVENT.CALL_USER, {
                receiverSocketID,
                signalData,
                callerDetail,
            });
        });
        peer.on('stream', (stream: MediaStream) => {
            if (userVideoRef.current) userVideoRef.current.srcObject = stream;
        });

        socketClient.on(SOCKET_EVENT.CALL_ACCEPTED, (signalData: SignalData) => {
            console.log('CALL_ACCEPTED');
            setIsAccepted(true);
            peer.signal(signalData);
        });

        connectionRef.current = peer;
    };

    const handleAnswerCallContext = () => {
        setIsAccepted(true);

        const { signalData, callerDetail } = callDetail;

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (signalData: SignalData) => {
            socketClient.emit(SOCKET_EVENT.ANSWER_CALL, {
                callerSocketID: callerDetail.socketID,
                signalData,
            });
        });
        peer.on('stream', (stream: MediaStream) => {
            if (userVideoRef.current) {
                userVideoRef.current.srcObject = stream;
            }
        });

        peer.signal(signalData);

        connectionRef.current = peer;
    };

    const handleEndCallContext = () => {
        if (!stream) return;

        socketClient.emit(SOCKET_EVENT.END_CALL, { receiverSocketID });
        // stream.getVideoTracks()[0].stop();
        // stream.getAudioTracks()[0].stop();

        // if (myVideoRef.current) myVideoRef.current.srcObject = null;
        // if (userVideoRef.current) userVideoRef.current.srcObject = null;
        // if (connectionRef.current) connectionRef.current.destroy();

        // setIsEnded(true);
        // setCallDetail(null as any);
        // setCallerDetail(null as any);
    };

    return (
        <VideoContext.Provider
            value={{
                stream,
                isEnded,
                callDetail,
                isAccepted,
                myVideoRef,
                userVideoRef,
                receiverSocketID,
                callerDetail,
                connectionRef,
                setIsEnded,
                setCallDetail,
                setCallerDetail,
                handleCallUserContext,
                handleSendCallerAndReceiverIDContext,
                handleAnswerCallContext,
                setStream,
                setIsAccepted,
                handleEndCallContext,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};

export default VideoProvider;
