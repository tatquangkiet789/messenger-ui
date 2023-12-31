import { ENDPOINTS } from '@src/constants/endpoints';
import { publicAxios } from '@src/lib/axiosClient';

// // [GET] /api/v1/users/suggested
export const findTop10SuggestedUsersService = async () => {
    const res = await publicAxios.get(ENDPOINTS.FIND_10_SUGGESTED_USERS);
    return res.data;
};

// [GET] /api/v1/search?q=:keyword
export const findAllUsersByKeywordService = async (keyword: string) => {
    const res = await publicAxios.get(ENDPOINTS.FIND_ALL_USERS_BY_KEYWORD({ keyword }));
    return res.data;
};
