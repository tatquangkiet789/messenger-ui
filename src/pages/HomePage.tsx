import PostList from '@src/features/posts/components/PostList';
import PostListSkeleton from '@src/features/posts/components/PostListSkeleton';
import usePosts from '@src/features/posts/hooks/usePosts';
import { Suspense, useState } from 'react';

const HomePage = () => {
    const [page, setPage] = useState(1);
    const { posts, isLastPage } = usePosts({ page });

    // useEffect(() => {
    //     if (page === 1) dispatch(updateNewPostList(true));
    //     else dispatch(updateNewPostList(false));

    //     dispatch(findAllPosts({ page: page }));
    // }, [dispatch, page]);

    return (
        <div className='w-full h-full py-6 pl-0 pr-4'>
            <Suspense fallback={<PostListSkeleton />}>
                <PostList
                    posts={posts}
                    isLastPage={isLastPage}
                    page={page}
                    onChangePage={setPage}
                />
            </Suspense>
        </div>
    );
};

export default HomePage;
