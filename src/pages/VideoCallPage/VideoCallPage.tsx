import CallAction from '@src/modules/videocalls/components/CallAction/CallAction';
import CallPeding from '@src/modules/videocalls/components/CallPeding/CallPeding';
import { FC, useEffect, useRef, useState, Fragment } from 'react';

const VideoCallPage: FC = () => {
    const [stream, setStream] = useState<MediaStream>();
    const myVideoRef = useRef<HTMLVideoElement | null>(null);
    // const microphonePermission = 'microphone' as PermissionName;
    // const cameraPermission = 'camera' as PermissionName;

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream);
            if (myVideoRef.current) myVideoRef.current.srcObject = stream;
        });
        // navigator.permissions.query({ name: microphonePermission }).then((permisson) => {
        //     console.log(permisson);
        // });
        // navigator.permissions.query({ name: cameraPermission }).then((permisson) => {
        //     console.log(permisson);
        // });
    }, []);
    // console.log(stream);

    return (
        <Fragment>
            {stream ? (
                <div className='w-screen h-screen bg-gray241_241_242_1 flex flex-col'>
                    <CallPeding />
                    <div
                        className='flex items-center justify-center gap-5 absolute 
                        bottom-5 left-0 right-0 mx-auto'
                    >
                        <CallAction stream={stream} />
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </Fragment>
    );
};

export default VideoCallPage;
