import { ENDPOINTS } from '@src/constants/endpoints';
import { publicAxios } from 'lib/axiosClient';

// // [GET] /api/v1/posts/:id/comments
export const findAllCommentsByPostIdService = async ({
    postID,
    page,
}: {
    postID: number;
    page: number;
}) => {
    const res = await publicAxios.get(ENDPOINTS.findAllCommentsByPostId(postId));
    return res.data;
};

// // [POST] /api/v1/posts/:postId/comments/create
export const createNewCommentService = async (value: INewComment) => {
    const { postId, content, accessToken, parentId } = value;
    const res = await privateAxios.post(
        ENDPOINTS.createNewComment(postId),
        { content: content, parentId: parentId },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    return res.data;
};
