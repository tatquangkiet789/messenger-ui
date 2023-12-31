import { User } from '@src/features/users/models/user';

export type Comment = {
    id: number;
    content: string;
    parentID: number | null;
    createdDate: string;
    userCommentDetail: User;
};
