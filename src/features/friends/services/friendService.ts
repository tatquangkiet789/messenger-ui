import { ENDPOINTS } from '@src/constants/endpoints';
import { privateAxios } from '@src/lib/axiosClient';
import { IFindFriend } from '../models/friend';

export const findAllFriendsSevice = async (param: IFindFriend) => {
    const { page, accessToken } = param;
    const res = await privateAxios.get(ENDPOINTS.FIND_ALL_FRIENDS(page), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};
