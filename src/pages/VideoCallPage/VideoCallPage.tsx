import { ROUTES } from '@src/constants/routes';
import SOCKET_EVENT from '@src/constants/socket';
import CallAction from '@src/features/videos/components/CallAction/CallAction';
import CallPending from '@src/features/videos/components/CallPeding/CallPeding';
import { VideoContext } from '@src/features/videos/context/VideoContext';
import { useAppSelector } from '@src/hooks/useAppSelector';
import socketClient from '@src/lib/socketClient';
import { useContext, useEffect } from 'react';
import {
    useLocation,
    // useNavigate
} from 'react-router-dom';

const VideoCallPage = () => {
    // const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as any)?.from.pathname || ROUTES.HOME;
    const { receiver } = useAppSelector((state) => state.friends);

    const {
        stream,
        setStream,
        handleCallUserContext,
        handleAnswerCallContext,
        callDetail,
        setCallDetail,
        myVideoRef,
        userVideoRef,
        isAccepted,
        handleEndCallContext,
        setIsEnded,
        isEnded,
        setIsAccepted,
    } = useContext(VideoContext);

    const handleReceiveCall = (data: any) => {
        const { signalData, callerDetail } = data;
        setCallDetail({ signalData, callerDetail, isReceivedCall: true });
    };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
            setStream(stream);
            if (myVideoRef.current) {
                myVideoRef.current.srcObject = stream;
            }
        });

        // Đây là bên người nhận
        socketClient.on(SOCKET_EVENT.CALL_USER, handleReceiveCall);

        return () => {
            socketClient.off(SOCKET_EVENT.CALL_USER, handleReceiveCall);
            setIsEnded(false);
            setIsAccepted(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEndCall = () => {
        handleEndCallContext();
    };

    return (
        // <>
        //     {stream ? (
        //         <div
        //             className='w-screen h-screen bg-gray241_241_242_1 flex
        //                     justify-end items-center'
        //         >
        //             <div className={`flex flex-col justify-center items-center`}>
        //                 <h1>My Video</h1>
        //                 <video className={`w-1/2`} ref={myVideoRef} autoPlay muted></video>
        //             </div>
        //             <div className={`flex flex-col justify-center items-center`}>
        //                 {isAccepted && !isEnded ? (
        //                     <>
        //                         <h1>User Video</h1>
        //                         <video
        //                             className={`w-1/2`}
        //                             ref={userVideoRef}
        //                             autoPlay
        //                             muted
        //                         ></video>
        //                     </>
        //                 ) : null}
        //             </div>
        //             {callDetail?.isReceivedCall ? (
        //                 <button onClick={handleAnswerCallContext}>Answer</button>
        //             ) : (
        //                 <button onClick={handleCallUserContext}>Call User</button>
        //             )}
        //             <a href={from} onClick={handleEndCall}>
        //                 Stop
        //             </a>
        //         </div>
        //     ) : null}
        // </>
        <>
            {stream ? (
                <div
                    className={`w-screen h-screen bg-gray241_241_242_1 flex justify-end 
                    items-center relative`}
                >
                    <div className={`w-full h-full`}>
                        {isAccepted && !isEnded ? (
                            <video ref={userVideoRef} className={`w-full h-full`} loop autoPlay />
                        ) : (
                            <CallPending
                                name={` ${receiver.lastName} ${receiver.firstName}`}
                                avatar={receiver.avatar}
                            />
                        )}
                        <CallAction
                            stream={stream}
                            callDetail={callDetail}
                            onCall={handleCallUserContext}
                            onAnwserCall={handleAnswerCallContext}
                            onEndCall={handleEndCall}
                        />
                    </div>
                    <video ref={myVideoRef} className={`w-28 h-28 top-0 right-0`} loop autoPlay />
                </div>
            ) : null}
        </>
    );
};

export default VideoCallPage;
