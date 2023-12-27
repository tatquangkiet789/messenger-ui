export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    isVerified: boolean;
    isFriendWithCurrentUser: boolean;
    isSentAddFriendNotification: boolean;
}

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
    isVerified: boolean;
    userRoleName: string;
};
