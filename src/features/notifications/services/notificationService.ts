import { privateAxios } from '@src/lib/axiosClient';
import {
    IAcceptOrDeclineAddFriendNotification,
    IFindAddFriendNotification,
} from '../models/notification';
import { ENDPOINTS } from '@src/constants/endpoints';

export const findAllAddFriendNotificationsService = async (param: IFindAddFriendNotification) => {
    const { page, accessToken } = param;
    const res = await privateAxios.get(ENDPOINTS.FIND_ALL_ADD_FRIEND_NOTIFICATIONS(page), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};

export const acceptAddFriendNotificationService = async (
    param: IAcceptOrDeclineAddFriendNotification,
) => {
    const { addFriendNotificationId, accessToken } = param;
    const res = await privateAxios.post(
        ENDPOINTS.ACCEPT_ADD_FRIEND_NOTIFICATION,
        { notificationId: addFriendNotificationId },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    return res.data;
};

export const declineAddFriendNotificationService = async (
    param: IAcceptOrDeclineAddFriendNotification,
) => {
    const { addFriendNotificationId, accessToken } = param;
    const res = await privateAxios.post(
        ENDPOINTS.DECLINE_ADD_FRIEND_NOTIFICATION,
        { notificationId: addFriendNotificationId },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    return res.data;
};
