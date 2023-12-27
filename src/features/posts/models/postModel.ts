import { User, IUserLikePost } from 'features/users/models/userModel';

export interface IPost {
    id: number;
    postTypeId: number;
    caption: string;
    postUrl: string;
    totalLikes: number;
    totalComments: number;
    userPostDetail: User;
    userLikePostList: IUserLikePost[];
    createdDate: Date;
}

export interface INewPostForm {
    caption: string;
    content?: File;
}

export interface IUserLikeOrUnlikePost {
    postId: number;
    accessToken: string;
}

export interface INewPost {
    formData: FormData;
    accessToken: string;
}

export interface IFindPost {
    postId?: number;
    page?: number;
    username?: string;
    accessToken?: string;
}
