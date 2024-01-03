import { User } from '@src/features/users/models/user';

export type Comment = {
    id: number;
    content: string;
    parentID: number | null;
    postID: number;
    createdDate: string;
    totalChildComments: number;
    userCommentDetail: User;
    childComments: Comment[];
};

export type CreateCommentForm = {
    content: string;
};

export type CreateComment = {
    postID: number;
    content: string;
    parentID: number | undefined;
};