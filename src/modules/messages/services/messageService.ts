import { privateAxios } from '@src/lib/axiosClient';
import { IFindMessage, INewMessage } from '../models/message';
import { ENDPOINTS } from '@src/constants/endpoints';

// [GET] /api/v1/messages/:userId?page=:page
export const findAllMessagesService = async (param: IFindMessage) => {
    const { userId, accessToken, page } = param;
    const res = await privateAxios.get(ENDPOINTS.FIND_ALL_MESSAGES(userId, page), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};

// [POST] /api/v1/messages/create
export const createNewMessageService = async (param: INewMessage) => {
    const { accessToken, content, receiverId } = param;
    const res = await privateAxios.post(
        ENDPOINTS.CREATE_NEW_MESSAGE,
        {
            content: content,
            receiverId: receiverId,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    return res.data;
};
