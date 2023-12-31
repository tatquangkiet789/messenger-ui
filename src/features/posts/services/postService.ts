import { ENDPOINTS } from '@src/constants/endpoints';
import { authAxios, publicAxios } from 'lib/axiosClient';

// [GET] /api/v1/posts?page=:page
// [GET] /api/v1/posts?page=:page&username=:username
export const findAllPostsService = async ({
    page,
    username,
}: {
    page: number;
    username?: string;
}) => {
    const res = await publicAxios.get(ENDPOINTS.FIND_ALL_POSTS({ page, username }));
    return res.data;
};

// [GET] /api/v1/posts/video?page=:page
export const findAllPostsAreVideoService = async ({ page }: { page: number }) => {
    const res = await publicAxios.get(ENDPOINTS.FIND_ALL_POSTS_ARE_VIDEO({ page }));
    return res.data;
};

// [GET] /v1/posts/user?page=:page
export const findAllPostsByCurrentUserService = async ({ page }: { page: number }) => {
    const res = await authAxios.get(ENDPOINTS.FIND_ALL_POSTS_BY_CURRENT_USER({ page }));
    return res.data;
};

// [GET] /api/v1/posts/:id
export const findPostByIDService = async ({ postID }: { postID: number }) => {
    const res = await publicAxios.get(ENDPOINTS.FIND_POST_BY_ID({ id: postID }));
    return res.data;
};

// [POST] /api/v1/posts/:id/like
export const likePostByIDService = async ({ postID }: { postID: number }) => {
    const res = await authAxios.get(ENDPOINTS.LIKE_POST_BY_ID({ id: postID }));
    return res.data;
};

// [POST] /api/v1/posts/:id/unlike
export const unlikePostByIDService = async ({ postID }: { postID: number }) => {
    const res = await authAxios.get(ENDPOINTS.UNlIKE_POST_BY_ID({ id: postID }));
    return res.data;
};

// [POST] /api/v1/posts/create
export const createPostService = async ({ formData }: { formData: FormData }) => {
    const res = await authAxios.post(ENDPOINTS.CREATE_POST, formData);
    return res.data;
};

// [GET] /api/v1/posts/friends?page=:page
export const findAllPostsFromFriendsService = async ({ page }: { page: number }) => {
    const res = await authAxios.get(ENDPOINTS.FIND_ALL_POSTS_FROM_FRIENDS({ page }));
    return res.data;
};
