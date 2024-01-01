import { ENDPOINTS } from '@src/constants/endpoints';
import { authAxios, publicAxios } from 'lib/axiosClient';
import { CreateChildComment, CreateComment } from '../models/comment';

// // [GET] /api/v1/posts/:id/comments
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

// // [POST] /api/v1/posts/:postId/comments/create
export const createCommentService = async (param: CreateComment | CreateChildComment) => {
    const res = await authAxios.post(ENDPOINTS.CREATE_COMMENT({ postID: param.postID }), param);
    return res.data;
};
