// import classNames from 'classnames/bind';
// import { STORAGE_KEY } from 'constants/constants';
// import { useAppDispatch } from 'hooks/useAppDispatch';
// import { useAppSelector } from 'hooks/useAppSelector';
// import PostList from 'modules/posts/components/PostList/PostList';
// import { FC, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//     findAllPosts,
//     findAllPostsByCurrentUserId,
//     updateNewPostList,
// } from 'redux/reducers/postSlice';
// import styles from './UserDetail.module.scss';

// const cx = classNames.bind(styles);

// const UserDetail: FC = () => {
//     const { username } = useParams();
//     const [page, setPage] = useState(1);

//     const dispatch = useAppDispatch();
//     const {
//         posts,
//         error: postError,
//         loading: postLoading,
//         hasNextPage,
//     } = useAppSelector((state) => state.posts);
//     const { currentUser } = useAppSelector((state) => state.auth);

//     useEffect(() => {
//         dispatch(updateNewPostList(true));
//         setPage(1);
//         window.scrollTo(0, 0);
//     }, [username, dispatch]);

//     useEffect(() => {
//         if (!username) return;

//         if (page === 1) dispatch(updateNewPostList(true));
//         else dispatch(updateNewPostList(false));

//         if (currentUser.username === username) {
//             const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;
//             dispatch(
//                 findAllPostsByCurrentUserId({ page: page, accessToken: accessToken }),
//             );
//             return;
//         }

//         dispatch(findAllPosts({ page: page, username: username }));
//     }, [currentUser.username, dispatch, page, username]);

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

// export default UserDetail;
export default function UserDetail() {
    return <h1>UserDetail</h1>;
}
