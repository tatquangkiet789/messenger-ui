import { User } from '@src/features/users/models/user';

export interface IFindAddFriendNotification {
    page: number;
    accessToken: string;
}

export interface IAcceptOrDeclineAddFriendNotification {
    addFriendNotificationId: number;
    accessToken: string;
}

export interface IDeleteAddFriendNotification {
    userID: number;
    accessToken: string;
}

export interface ICreateAddFriendNotification {
    receiverId: number;
    accessToken: string;
}

export interface IAddFriendNotification {
    id: number;
    content: string;
    notificationTypeId: number;
    notificationSenderDetail: {
        firstName: string;
        lastName: string;
        avatar: string;
    };
}

export type PostNotificationType = 'LIKE' | 'COMMENT';

export type NotificationResponse = {
    id: number;
    content: string;
    notificationTypeName: string;
    notificationSenderDetail: User;
};

export type PostNotificationResponse = {
    content: string;
    notificationSenderDetail: User;
    notificationType: PostNotificationType;
    postID: number;
};
