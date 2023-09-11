import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    IFindMessage,
    IMessage,
    INewMessage,
} from '@src/modules/messages/models/message';
import {
    createNewMessageService,
    findAllMessagesService,
} from '@src/modules/messages/services/messageService';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface IMessageState {
    messages: IMessage[];
    loading: boolean;
    error: string;
    isNewList: boolean;
    hasNextPage: boolean;
}

const initialState: IMessageState = {
    messages: [],
    loading: false,
    error: '',
    isNewList: false,
    hasNextPage: false,
};

// [GET] /api/v1/messages/:userId?page=:page
export const findAllMessages = createAsyncThunk(
    'findAllMessages',
    async (param: IFindMessage, { rejectWithValue }) => {
        try {
            const data = await findAllMessagesService(param);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// [POST] /api/v1/messages/create
export const createNewMessage = createAsyncThunk(
    'createNewMessage',
    async (param: INewMessage, { rejectWithValue }) => {
        try {
            const data = await createNewMessageService(param);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        resetMessages: (state) => {
            console.log('Rest Message List');
            state.messages = [];
        },
        setIsNewList: (state, action: PayloadAction<boolean>) => {
            state.isNewList = action.payload;
        },
        receiveNewMessageFromSocket: (state, action) => {
            state.messages = [...state.messages, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
            // Find All Messages
            .addCase(findAllMessages.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(findAllMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.hasNextPage = Boolean(action.payload.content.length);
                if (state.isNewList) {
                    state.messages = action.payload.content;
                } else {
                    state.messages = [...action.payload.content, ...state.messages];
                }
            })
            .addCase(findAllMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            })
            // Create New Message
            .addCase(createNewMessage.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(createNewMessage.fulfilled, (state) => {
                state.loading = false;
                // state.messages = [...state.messages, action.payload.content];
            })
            .addCase(createNewMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            });
    },
});

export const { resetMessages, setIsNewList, receiveNewMessageFromSocket } =
    messageSlice.actions;

export default messageSlice.reducer;
