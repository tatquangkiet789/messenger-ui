import { memo } from 'react';
import ReactPlayer from 'react-player';

type VideoPlayerSize = '600px' | '100%';

type VideoPlayerProps = {
    url: string;
    size: VideoPlayerSize;
};

const VideoPlayer = memo(function VideoPlayer({ url, size }: VideoPlayerProps) {
    return <ReactPlayer width={size} url={url} controls={true} />;
});

export default VideoPlayer;
