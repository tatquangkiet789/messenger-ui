interface ILastestMessage {
    content: string;
    messageTypeId: number;
}

export interface IFriend {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    tick: boolean;
    lastestMessage: ILastestMessage;
    username: string;
}

export interface IFindFriend {
    page: number;
    accessToken: string;
}
