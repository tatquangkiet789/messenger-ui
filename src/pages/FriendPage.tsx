import PostList from '@src/features/posts/components/PostList';
import PostListSkeleton from '@src/features/posts/components/PostListSkeleton';
import usePosts from '@src/features/posts/hooks/usePosts';
import { useScrollToTop } from '@src/hooks';
import { Suspense, useState } from 'react';

export default function FriendPage() {
    const [page, setPage] = useState(1);
    const { posts, isLastPage } = usePosts({ page, type: 'friends' });
    const { elementRef } = useScrollToTop(page);

    return (
        <>
            <div ref={elementRef}></div>
            <Suspense fallback={<PostListSkeleton />}>
                <PostList posts={posts} isLastPage={isLastPage} onChangePage={setPage} />
            </Suspense>
        </>
    );
}
