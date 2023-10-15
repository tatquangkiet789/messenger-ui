import { ENDPOINTS } from '@src/constants/endpoints';
import { privateAxios } from '@src/lib/axiosClient';
import { IFindUsersByKeyword } from '../models/user';

export const findAllUsersByKeywordService = async (param: IFindUsersByKeyword) => {
    const { keyword, accessToken } = param;
    const response = await privateAxios.post(ENDPOINTS.FIND_ALL_USERS_BY_KEYWORD(keyword), null, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
