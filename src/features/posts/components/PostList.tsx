import { Post } from 'features/posts/models/post';
import { memo } from 'react';
import PostItem from './PostItem';
import useIntersectionObserver from '@src/hooks/useIntersectionObserver';

type PostListProps = {
    posts: Post[];
    isLastPage: boolean;
    onChangePage: (page: any) => void;
};

const PostList = memo(function PostList({ posts, isLastPage, onChangePage }: PostListProps) {
    const { elementRef } = useIntersectionObserver({
        isUnobserve: isLastPage,
        onChange: () => onChangePage((prev: any) => prev + 1),
        // onChange: () => {
        //     console.log(`onChangePage() in PostList`);
        // },
    });

    return (
        <div className={`flex flex-col items-center`}>
            {posts.length === 0 ? (
                <h1>Chưa có bài viết</h1>
            ) : (
                <>
                    {posts.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                    <div className='flex items-center justify-center p-5' ref={elementRef}>
                        <h1>Đã xem hết bài viết</h1>
                    </div>
                </>
            )}
        </div>
    );
});

export default PostList;
