import { FC, Fragment, useState } from 'react';
import {
    IoVideocamOutline,
    IoVideocamOffOutline,
    IoMicOffOutline,
    IoMicOutline,
} from 'react-icons/io5';
import { MdCallEnd } from 'react-icons/md';
import { CallDetail } from '../../constants/videoConstant';

type CallActionProps = {
    stream: MediaStream;
    callDetail?: CallDetail;
    onCall: () => void;
    onAnwserCall: () => void;
    onEndCall: () => void;
};

const CallAction: FC<CallActionProps> = ({ stream, callDetail, onEndCall }) => {
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

    return (
        <Fragment>
            <button
                className='flex items-center p-3 rounded-full hover:cursor-pointer 
                        hover:bg-gray006'
                onClick={handleToggleAudio}
            >
                {callDetail && callDetail.isReceivedCall ? <p>Trả lời</p> : <p>Gọi</p>}
            </button>
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
        </Fragment>
    );
};

export default CallAction;
