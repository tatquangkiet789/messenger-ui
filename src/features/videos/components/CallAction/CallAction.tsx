import { FC, useState } from 'react';
import { CallDetail } from '../../constants/videoConstant';
import Lottie from 'lottie-react';
import { callingIcon } from '@src/assets';
import {
    IoMicOffOutline,
    IoMicOutline,
    IoVideocamOffOutline,
    IoVideocamOutline,
    MdCallEnd,
} from '@src/components/icons';

type CallActionProps = {
    stream: MediaStream;
    callDetail?: CallDetail;
    onCall: () => void;
    onAnswerCall: () => void;
    onEndCall: () => void;
};

const CallAction: FC<CallActionProps> = ({
    stream,
    callDetail,
    onEndCall,
    onCall,
    onAnswerCall,
}) => {
    const [isEnableAudio, setIsEnableAudio] = useState(false);
    const [isEnableVideo, setIsEnableVideo] = useState(false);

    const handleToggleAudio = () => {
        if (!stream) return;

        stream.getAudioTracks()[0].enabled = !isEnableAudio;
        setIsEnableAudio(!isEnableAudio);
    };

    const handleToggleVideo = () => {
        if (!stream) return;

        stream.getVideoTracks()[0].enabled = !isEnableVideo;
        setIsEnableVideo(!isEnableVideo);
    };

    const handleEndCall = () => {
        onEndCall();
    };

    const handleCall = () => {
        onCall();
    };

    const handleAnswerCall = () => {
        onAnswerCall();
    };

    return (
        <div className={`flex gap-6 bg-red-50 absolute bottom-7`}>
            {callDetail && callDetail.isReceivedCall ? (
                <Lottie
                    animationData={callingIcon}
                    autoPlay
                    loop
                    onClick={handleAnswerCall}
                    className={`cursor-pointer`}
                />
            ) : (
                <div
                    className='flex items-center p-3 rounded-full hover:cursor-pointer 
                    hover:bg-gray006'
                    onClick={handleCall}
                >
                    Gọi
                </div>
            )}
            <button
                className='flex items-center p-3 rounded-full hover:cursor-pointer 
                hover:bg-gray006'
                onClick={handleToggleAudio}
            >
                {isEnableAudio ? (
                    <IoMicOutline size={32} className='text-primary' />
                ) : (
                    <IoMicOffOutline size={32} className='text-primary' />
                )}
            </button>
            <button
                className='flex items-center p-3 rounded-full hover:cursor-pointer 
                hover:bg-gray006'
                onClick={handleToggleVideo}
            >
                {isEnableVideo ? (
                    <IoVideocamOutline size={32} className='text-primary' />
                ) : (
                    <IoVideocamOffOutline size={32} className='text-primary' />
                )}
            </button>
            <button
                className='flex items-center p-3 rounded-full cursor-pointer
                bg-red-500 hover:bg-red-600'
                onClick={handleEndCall}
            >
                <MdCallEnd size={32} className='text-white' />
            </button>
        </div>
    );
};

export default CallAction;
