// import classNames from 'classnames/bind';
// import { FC, useEffect, useState } from 'react';
// import styles from './Friend.module.scss';
// import { useAppSelector } from 'hooks/useAppSelector';
// import { useAppDispatch } from 'hooks/useAppDispatch';
// import { findAllPostsFromFriends, updateNewPostList } from 'redux/reducers/postSlice';
// import { STORAGE_KEY } from 'constants/constants';
// import PostList from 'modules/posts/components/PostList/PostList';

// const cx = classNames.bind(styles);

// const Friend: FC = () => {
//     const [page, setPage] = useState(1);
//     const {
//         error: postError,
//         loading: postLoading,
//         posts,
//         hasNextPage,
//     } = useAppSelector((state) => state.posts);
//     const dispatch = useAppDispatch();
//     const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

//     useEffect(() => {
//         if (page === 1) dispatch(updateNewPostList(true));
//         else dispatch(updateNewPostList(false));

//         dispatch(findAllPostsFromFriends({ page: page, accessToken: accessToken! }));
//     }, [accessToken, dispatch, page]);

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

// export default Friend;
export default function Friend() {
    return <h1>Friend</h1>;
}
