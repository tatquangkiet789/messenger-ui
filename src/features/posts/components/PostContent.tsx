import { memo } from 'react';
import { PostType } from '../models/postType.enum';
import VideoPlayer from '@src/components/VideoPlayer';

type ContentSize = '600px' | '100%';

type PostContentProps = {
    postTypeName: string;
    postUrl: string;
    contentSize: ContentSize;
};

const PostContent = memo(function PostContent({
    postTypeName,
    contentSize,
    postUrl,
}: PostContentProps) {
    return (
        <>
            {postTypeName === PostType.Image ? (
                <div
                    className={`bg-center bg-cover bg-no-repeat`}
                    style={{
                        backgroundImage: `url(${postUrl})`,
                        width: `${contentSize}`,
                        height: `${contentSize}`,
                    }}
                ></div>
            ) : null}
            {postTypeName === PostType.Video ? (
                <VideoPlayer size={contentSize} url={postUrl} />
            ) : null}
        </>
    );
});

export default PostContent;
