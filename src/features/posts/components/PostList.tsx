// import classNames from 'classnames/bind';
// import { FC, Fragment, useEffect, useRef, useState } from 'react';
// import styles from './PostList.module.scss';
// import { IPost } from 'modules/posts/models/postModel';
// import PostItem from '../PostItem/PostItem';

import { Post } from 'features/posts/models/post';
import { memo } from 'react';
import PostItem from './PostItem';

//     return (
//         <div className={cx('container')}>
//             {postList.length === 0 && postLoading ? (
//                 <div>Đang tải bài viết</div>
//             ) : postError ? (
//                 <div>{postError}</div>
//             ) : postList.length === 0 ? (
//                 <div>Chưa có bài viết</div>
//             ) : (
//                 <Fragment>
//                     {postList.map((post) => (
//                         <PostItem key={post.id} post={post} />
//                     ))}
//                     <h1
//                         ref={setElement}
//                         style={{
//                             width: '100%',
//                             backgroundColor: 'red',
//                             fontSize: '50px',
//                         }}
//                     >
//                         End of page
//                     </h1>
//                 </Fragment>
//             )}
//         </div>
//     );
// };

type PostListProps = {
    posts: Post[];
    isLastPage: boolean;
    page: number;
    onChangePage: (page: any) => void;
};

const PostList = memo(function PostList({
    posts,
    isLastPage,
    page,
    onChangePage,
}: PostListProps) {
    return (
        <div className={`flex flex-col items-center`}>
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
});

export default PostList;
