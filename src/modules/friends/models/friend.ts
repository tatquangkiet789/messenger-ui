export interface IFriend {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
    tick: boolean;
    lastestMessage: string;
}

export interface IFindFriend {
    page: number;
    accessToken: string;
}
