import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MESSAGE_TYPE } from '@src/constants/constants';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IFriend } from './models/friend';
import { findAllFriends, findAllUsersByKeyword } from './services/friendThunk';
import { IUser } from '../users/models/user';

interface IFriendState {
    friends: IFriend[];
    loading: boolean;
    error: string;
    receiver: IFriend;
    activeId: number;
    hasNextPage: boolean;
    userReceiveNewMessageId: number;
    toggleNewReceiver: boolean;
    searchResultList: IUser[];
}

const initialState: IFriendState = {
    friends: [],
    loading: false,
    error: '',
    receiver: null as any,
    activeId: 0,
    hasNextPage: false,
    userReceiveNewMessageId: 0,
    toggleNewReceiver: false,
    searchResultList: [],
};

const friendSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        setReceiver(state: IFriendState, action: PayloadAction<number>) {
            state.receiver = [...state.friends].filter((friend) => friend.id === action.payload)[0];
            state.activeId = action.payload;
            state.toggleNewReceiver = !state.toggleNewReceiver;
        },
        updateReceiverLastestMessage: (state, action) => {
            state.friends = [...state.friends].map((friend) => {
                if (friend.id === action.payload.senderDetail.id) {
                    state.userReceiveNewMessageId = friend.id;
                    if (action.payload.messageTypeId === MESSAGE_TYPE.IMAGE) {
                        return {
                            ...friend,
                            lastestMessage: {
                                content: `Hình ảnh`,
                                messageTypeId: MESSAGE_TYPE.IMAGE,
                            },
                        };
                    }
                    return {
                        ...friend,
                        lastestMessage: {
                            content: `${action.payload.content}`,
                            messageTypeId: MESSAGE_TYPE.TEXT,
                        },
                    };
                }
                return friend;
            });
        },
        updateSenderLastestMessage: (state, action) => {
            state.friends = [...state.friends].map((friend) => {
                if (friend.id === action.payload.receiverDetail.id) {
                    if (action.payload.messageTypeId === MESSAGE_TYPE.IMAGE) {
                        return {
                            ...friend,
                            lastestMessage: {
                                content: `Bạn: Hình ảnh`,
                                messageTypeId: MESSAGE_TYPE.IMAGE,
                            },
                        };
                    }
                    return {
                        ...friend,
                        lastestMessage: {
                            content: `Bạn: ${action.payload.content}`,
                            messageTypeId: MESSAGE_TYPE.TEXT,
                        },
                    };
                }
                return friend;
            });
        },
        resetUserReceiveNewMessage: (state) => {
            state.userReceiveNewMessageId = 0;
        },
        resetReceiver: (state) => {
            state.receiver = null as any;
        },
        updateFriendListAfterAcceptAddFriendNotification: (state, action) => {
            state.friends = [...state.friends, action.payload];
        },
        resetSearchResultList: (state) => {
            state.searchResultList = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findAllFriends.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.friends = [];
            })
            .addCase(findAllFriends.fulfilled, (state, action) => {
                state.loading = false;
                state.friends = action.payload.content;
                state.hasNextPage = Boolean(action.payload.content.length);
            })
            .addCase(findAllFriends.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            })
            .addCase(findAllUsersByKeyword.pending, (state) => {
                state.searchResultList = [];
                state.loading = true;
                state.error = '';
            })
            .addCase(findAllUsersByKeyword.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResultList = action.payload.content;
            })
            .addCase(findAllUsersByKeyword.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
            });
    },
});

export const {
    setReceiver,
    updateReceiverLastestMessage,
    resetUserReceiveNewMessage,
    updateSenderLastestMessage,
    resetReceiver,
    updateFriendListAfterAcceptAddFriendNotification,
    resetSearchResultList,
} = friendSlice.actions;

export default friendSlice.reducer;
