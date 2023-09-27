export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
    email: string;
    tick: boolean;
    isFriendWithCurrentUser: boolean;
}
