import { User } from 'features/users/models/user';

export type Post = {
    id: number;
    caption: string;
    postUrl: string;
    postTypeName: string;
    totalLikes: number;
    totalComments: number;
    authorDetail: User;
    createdDate: Date;
    isLikeByCurrentUser: boolean;
    isActive: boolean;
};

export type CreatePost = {
    caption: string;
    content: File;
};
