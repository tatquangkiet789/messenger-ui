export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    tick: boolean;
    isFriendWithCurrentUser: boolean;
}

export interface IFindUsersByKeyword {
    keyword: string;
    accessToken: string;
}
