import { Post } from 'features/posts/models/post';
import { memo } from 'react';
import PostItem from './PostItem';
import useIntersectionObserver from '@src/hooks/useIntersectionObserver';
import { AiOutlineLoading3Quarters } from '@src/components/icons';

type PostListProps = {
    posts: Post[];
    isLastPage: boolean;
    onChangePage: (page: any) => void;
};

const PostList = memo(function PostList({ posts, isLastPage, onChangePage }: PostListProps) {
    const { elementRef } = useIntersectionObserver({
        isUnobserve: isLastPage,
        onChange: () => onChangePage((prev: any) => prev + 1),
    });

    return (
        <div className={`flex flex-col items-center`}>
            {posts.length === 0 ? (
                <p className='text-2xl font-semibold'>Chưa có bài viết</p>
            ) : (
                <>
                    {posts.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                    <div className='flex items-center justify-center' ref={elementRef}>
                        {isLastPage ? (
                            <p className='text-2xl font-semibold pb-6'>Đã xem hết bài viết</p>
                        ) : (
                            <AiOutlineLoading3Quarters className='animate-spin' size={24} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
});

export default PostList;
