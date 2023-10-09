import { ROUTES } from '@src/constants/routes';
import { VideoContext } from '@src/features/videos/context/VideoContext';
import { FC, Fragment, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VideoCallPage: FC = () => {
    const { stream, myVideoRef, userVideoRef, receiverSocketID, handleCallUserContext } =
        useContext(VideoContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = (location.state as any)?.from.pathname || ROUTES.HOME;

    useEffect(() => {
        if (receiverSocketID.length === 0) return;

        handleCallUserContext();
    }, [receiverSocketID, handleCallUserContext, navigate]);

    // navigator.permissions.query({ name: microphonePermission }).then((permisson) => {
    //     console.log(permisson);
    // });
    // navigator.permissions.query({ name: cameraPermission }).then((permisson) => {
    //     console.log(permisson);
    // });

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
