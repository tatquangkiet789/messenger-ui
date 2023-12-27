import { memo } from 'react';
import ReactPlayer from 'react-player';

type VideoPlayerProps = {
    url: string;
};

const VideoPlayer = memo(function VideoPlayer({ url }: VideoPlayerProps) {
    return <ReactPlayer width='400px' url={url} controls={true} />;
});

export default VideoPlayer;
