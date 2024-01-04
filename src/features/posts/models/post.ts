import { User, UserLike } from 'features/users/models/user';

export type Post = {
    id: number;
    caption: string;
    postUrl: string;
    postTypeName: string;
    totalLikes: number;
    totalComments: number;
    authorDetail: User;
    createdDate: Date;
    isActive: boolean;
    userLikeList: UserLike[];
};

export type CreatePost = {
    caption: string;
    content: File;
};
