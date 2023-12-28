import PostList from '@src/features/posts/components/PostList';
import PostListSkeleton from '@src/features/posts/components/PostListSkeleton';
import usePosts from '@src/features/posts/hooks/usePosts';
import { Suspense, useState } from 'react';

export default function HomePage() {
    const [page, setPage] = useState(1);
    const { posts, isLastPage } = usePosts({ page });

    console.log('HomePage: posts: ', posts);

    return (
        <Suspense fallback={<PostListSkeleton />}>
            <PostList posts={posts} isLastPage={isLastPage} onChangePage={setPage} />
        </Suspense>
    );
}
