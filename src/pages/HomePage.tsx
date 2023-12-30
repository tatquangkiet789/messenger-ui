import PostList from '@src/features/posts/components/PostList';
import PostListSkeleton from '@src/features/posts/components/PostListSkeleton';
import usePosts from '@src/features/posts/hooks/usePosts';
import { useScrollToTop } from '@src/hooks';
import { Suspense } from 'react';

export default function HomePage() {
    const { posts, isLastPage, setPage, page } = usePosts({ type: 'default' });
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
