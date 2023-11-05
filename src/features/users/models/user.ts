export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    tick: boolean;
    isFriendWithCurrentUser: boolean;
    isSentAddFriendNotification: boolean;
}

export interface IFindUsersByKeyword {
    keyword: string;
    accessToken: string;
}
