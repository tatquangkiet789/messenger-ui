import { ENDPOINTS } from '@src/constants/endpoints';
import { privateAxios } from '@src/lib/axiosClient';
import { IFindFriend, IFindUsersByKeyword } from '../models/friend';

export const findAllFriendsSevice = async (param: IFindFriend) => {
    const { page, accessToken } = param;
    const res = await privateAxios.get(ENDPOINTS.FIND_ALL_FRIENDS(page), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};

export const findAllUsersByKeywordService = async (param: IFindUsersByKeyword) => {
    const { keyword, accessToken } = param;
    const response = await privateAxios.post(ENDPOINTS.FIND_ALL_USERS_BY_KEYWORD(keyword), null, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
