import { User } from '@src/features/users/models/user';

export type Comment = {
    id: number;
    content: string;
    parentID: number | null;
    createdDate: string;
    totalChildComments: number;
    userCommentDetail: User;
};

export type CreateComment = {
    postID: number;
    content: string;
};

export type CreateChildComment = {
    postID: number;
    content: string;
    parentID: number;
};
