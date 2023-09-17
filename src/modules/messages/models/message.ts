export interface IFindMessage {
    accessToken: string;
    userId: number;
    page: number;
}

export interface IMessage {
    id: number;
    messageTypeId: number;
    senderDetail: {
        id: number;
        avatar: string;
    };
    receiverDetail: {
        id: number;
        avatar: string;
    };
    content: string;
    createdDate: Date;
}

export interface INewMessage {
    formData: FormData;
    accessToken: string;
}

export interface ISendMessage {
    senderName: string;
    receiverName: string;
}
