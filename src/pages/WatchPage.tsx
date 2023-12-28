// import classNames from 'classnames/bind';
// import { useAppDispatch } from 'hooks/useAppDispatch';
// import { useAppSelector } from 'hooks/useAppSelector';
// import { FC, useEffect, useState } from 'react';
// import { updateNewPostList, findAllPostsAreVideo } from 'redux/reducers/postSlice';
// import styles from './Watch.module.scss';
// import PostList from 'modules/posts/components/PostList/PostList';

import PostList from '@src/features/posts/components/PostList';
import PostListSkeleton from '@src/features/posts/components/PostListSkeleton';
import usePosts from '@src/features/posts/hooks/usePosts';
import { Suspense, useState } from 'react';

// const cx = classNames.bind(styles);

// const Watch: FC = () => {
//     const [page, setPage] = useState(1);

//     const dispatch = useAppDispatch();
//     const {
//         posts,
//         error: postError,
//         loading: postLoading,
//         hasNextPage,
//     } = useAppSelector((state) => state.posts);

//     useEffect(() => {
//         if (page === 1) dispatch(updateNewPostList(true));
//         else dispatch(updateNewPostList(false));

//         dispatch(findAllPostsAreVideo({ page: page }));
//     }, [dispatch, page]);

//     return (
//         <div className={cx('container')}>
//             <PostList
//                 page={page}
//                 onChangePage={setPage}
//                 postList={posts}
//                 postError={postError}
//                 postLoading={postLoading}
//                 hasNextPage={hasNextPage}
//             />
//         </div>
//     );
// };

// export default Watch;
export default function WatchPage() {
    const [page, setPage] = useState(1);
    const { posts, isLastPage } = usePosts({ page, isWatch: true });

    return (
        <Suspense fallback={<PostListSkeleton />}>
            <PostList posts={posts} isLastPage={isLastPage} onChangePage={setPage} />
        </Suspense>
    );
}
