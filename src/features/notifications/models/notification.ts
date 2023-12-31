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
