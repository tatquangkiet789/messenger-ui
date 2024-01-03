import { ENDPOINTS } from '@src/constants/endpoints';
import { authAxios, publicAxios } from 'lib/axiosClient';
import { CreateComment } from '../models/comment';

// [GET] /api/v1/posts/:id/comments?page=:page
export const findAllCommentsByPostIDService = async ({
    postID,
    page,
}: {
    postID: number;
    page: number;
}) => {
    const res = await publicAxios.get(ENDPOINTS.FIND_ALL_COMMENTS_BY_POST_ID({ postID, page }));
    return res.data;
};

// [GET] /api/v1/posts/:id/comments/:parentId/?page=:page
export const findAllChildCommentsByParentIDService = async ({
    postID,
    page,
    parentID,
}: {
    postID: number;
    page: number;
    parentID: number;
}) => {
    const res = await publicAxios.get(
        ENDPOINTS.FIND_ALL_CHILD_COMMENTS_BY_PARENT_ID({ postID, page, parentID }),
    );
    return res.data;
};

// [POST] /api/v1/posts/:postId/comments/create
export const createCommentService = async (param: CreateComment) => {
    const res = await authAxios.post(ENDPOINTS.CREATE_COMMENT({ postID: param.postID }), param);
    return res.data;
};
