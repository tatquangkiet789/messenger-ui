import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFindFriend, IFriend } from '@src/modules/friends/models/friend';
import { findAllFriendsSevice } from '@src/modules/friends/services/friendService';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface IFriendState {
    friends: IFriend[];
    loading: boolean;
    error: string;
    receiver: IFriend;
    activeId: number;
    hasNextPage: boolean;
}

const initialState: IFriendState = {
    friends: [],
    loading: false,
    error: '',
    receiver: null as any,
    activeId: 0,
    hasNextPage: false,
};

// [GET] /api/v1/friends
export const findAllFriends = createAsyncThunk(
    'findAllFriends',
    async (param: IFindFriend, { rejectWithValue }) => {
        try {
            const data = await findAllFriendsSevice(param);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

const friendSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        setReceiver(state: IFriendState, action: PayloadAction<number>) {
            state.receiver = [...state.friends].filter(
                (friend) => friend.id === action.payload,
            )[0];
            state.activeId = action.payload;
        },
        updateLastestMessageFromSocket: (state, action) => {
            state.friends = [...state.friends].map((friend) => {
                if (friend.id === action.payload.senderDetail.id) {
                    return { ...friend, lastestMessage: action.payload.content };
                }
                return friend;
            });
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
            });
    },
});

export const { setReceiver, updateLastestMessageFromSocket } = friendSlice.actions;

export default friendSlice.reducer;
