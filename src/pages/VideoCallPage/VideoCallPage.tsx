import { ROUTES } from '@src/constants/routes';
import SOCKET_EVENT from '@src/constants/socket';
import { useAppSelector } from '@src/hooks/useAppSelector';
import socketClient from '@src/lib/socketClient';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimplePeer from 'simple-peer';

type Call = {
    isReceivedCall: boolean;
    callFrom: string;
    signal: string;
    callerName: string;
};

const VideoCallPage: FC = () => {
    const [stream, setStream] = useState<MediaStream>();
    const myVideoRef = useRef<HTMLVideoElement | null>(null);
    const userVideoRef = useRef<HTMLVideoElement | null>(null);

    const location = useLocation();
    const navigate = useNavigate();
    const from = (location.state as any)?.from.pathname || ROUTES.HOME;

    const { currentUser } = useAppSelector((state) => state.auth);
    const { receiver } = useAppSelector((state) => state.friends);
    // const microphonePermission = 'microphone' as PermissionName;
    // const cameraPermission = 'camera' as PermissionName;
    // const isAccepted = false;
    const [callDetail, setCallDetail] = useState<Call>();
    const [isAccepted, setIsAccepted] = useState(false);
    const [isEnded, setIsEnded] = useState(false);

    const connectionRef = useRef<SimplePeer.Instance | null>(null);
    const [videoCallReceiverId, setVideoReceiverId] = useState('');
    const [callerName, setCallerName] = useState('');

    useEffect(() => {
        // Get Audio and Camera Permissons
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream);
            if (myVideoRef.current) myVideoRef.current.srcObject = stream;
            if (userVideoRef.current) userVideoRef.current.srcObject = stream;
        });

        socketClient.emit(SOCKET_EVENT.SEND_VIDEO_CALL_RECEIVER_ID, { userId: receiver.id });
        // socketClient.on(
        //     SOCKET_EVENT.RECEIVE_VIDEO_CALL_RECEIVER_ID,
        //     ({ videoCallReceiverSocketId }: { videoCallReceiverSocketId: string }) => {
        //         console.log(`socketClient.on(SOCKET_EVENT.RECEIVE_VIDEO_CALL_RECEIVER_ID)`);
        //         setVideoReceiverId(videoCallReceiverSocketId);
        //     },
        // );

        // socketClient.on(SOCKET_EVENT.CALL_USER, (data: any) => {
        //     console.log(`socketClient.on(SOCKET_EVENT.CALL_USER)`);
        //     const { signal, from, name } = data;
        //     setCallDetail({ isReceivedCall: true, callFrom: from, callerName: name, signal });
        // });
    }, []);

    // navigator.permissions.query({ name: microphonePermission }).then((permisson) => {
    //     console.log(permisson);
    // });
    // navigator.permissions.query({ name: cameraPermission }).then((permisson) => {
    //     console.log(permisson);
    // });

    // const answerCall = () => {
    //     setIsAccepted(true);
    //     const peer = new SimplePeer({ initiator: false, trickle: false, stream });
    //     peer.on('signal', (data: any) => {
    //         socketClient.emit(SOCKET_EVENT.ANSWER_CALL, { signal: data, to: callDetail!.from });
    //     });
    //     peer.on('stream', (stream: any) => {
    //         if (userVideoRef.current) userVideoRef.current.srcObject = stream;
    //     });
    //     if (callDetail) peer.signal(callDetail.signal);
    //     connectionRef.current = peer;
    // };

    // const callUser = (id: any) => {
    //     const peer = new SimplePeer({ initiator: true, trickle: false, stream });
    //     peer.on('signal', (data: any) => {
    //         socketClient.emit('call-user', { userToCall: id, signalData: data, from: me, name });
    //     });
    //     peer.on('stream', (currentStream: any) => {
    //         if (userVideoRef.current) userVideoRef.current.srcObject = currentStream;
    //     });
    //     socketClient.on('call-accepted', (signal: any) => {
    //         setIsAccepted(true);

    //         peer.signal(signal);
    //     });
    //     connectionRef.current = peer;
    // };

    // const leaveCall = () => {
    //     setIsEnded(true);
    //     if (connectionRef.current) connectionRef.current?.destroy();
    // };

    const handleStop = () => {
        if (!stream) return;

        stream.getVideoTracks()[0].stop();
        stream.getAudioTracks()[0].stop();

        if (myVideoRef.current) myVideoRef.current.srcObject = null;
        if (userVideoRef.current) userVideoRef.current.srcObject = null;

        return navigate(from);
    };

    return (
        <Fragment>
            {stream ? (
                <div
                    className='w-screen h-screen bg-gray241_241_242_1 flex
                    justify-end items-center'
                >
                    {/* {isAccepted ? (
                        <video
                            className={`w-full h-screen fixed`}
                            ref={myVideoRef}
                            autoPlay
                        ></video>
                    ) : (
                        <CallPeding />
                    )} */}
                    <div className={`flex flex-col justify-center items-center`}>
                        <h1>My Video</h1>
                        <video className={`w-1/2`} ref={myVideoRef} autoPlay muted></video>
                    </div>
                    <div className={`flex flex-col justify-center items-center`}>
                        <h1>User Video</h1>
                        <video className={`w-1/2`} ref={userVideoRef} autoPlay muted></video>
                    </div>
                    <button onClick={handleStop}>Stop</button>
                </div>
            ) : null}

            {/* <input type='text' value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
            <button onClick={() => callUser(idToCall)}>Call</button>
            <button onClick={() => console.log(me)}>Copy ID</button> */}

            {/* {isAccepted ? (
                <div
                    className='w-screen h-screen bg-gray241_241_242_1 flex flex-col 
                    justify-end items-center'
                >
                    <h1>User Video</h1>
                    <div className='w-1/2'>
                        <video className={`w-full h-full`} ref={userVideoRef} autoPlay></video>
                    </div>
                </div>
            ) : null} */}

            {/* {callDetail!.isReceivedCall && !isAccepted ? (
                <div
                    className='flex items-center justify-center gap-5 absolute 
                            bottom-5 left-0 right-0 mx-auto'
                >
                    <CallAction stream={stream} />
                    <button onClick={answerCall}>Answer call</button>
                </div>
            ) : null} */}
        </Fragment>
    );
};

export default VideoCallPage;
