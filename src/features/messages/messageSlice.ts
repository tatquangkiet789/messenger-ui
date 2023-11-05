import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IMessage } from './models/message';
import { findAllMessages, createNewMessage } from './services/messageThunk';

interface IMessageState {
    messages: IMessage[];
    loading: boolean;
    error: string;
    isNewList: boolean;
    hasNextPage: boolean;
    page: number;
    selectedMessage: IMessage | undefined;
}

const initialState: IMessageState = {
    messages: [],
    loading: false,
    error: '',
    isNewList: false,
    hasNextPage: false,
    page: 1,
    selectedMessage: undefined,
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        changeMessagePage: (state) => {
            state.page++;
        },
        resetMessages: (state) => {
            state.messages = [];
        },
        setIsNewList: (state, action: PayloadAction<boolean>) => {
            state.isNewList = action.payload;
        },
        receiveNewMessageFromSocket: (state, action) => {
            state.messages = [...state.messages, action.payload];
        },
        setSelectedMessage: (state, action) => {
            state.selectedMessage = [...state.messages].find(
                (message) => message.id === action.payload,
            );
        },
        resetSelectedMessage: (state) => {
            state.selectedMessage = undefined;
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

export const {
    resetMessages,
    setIsNewList,
    receiveNewMessageFromSocket,
    setSelectedMessage,
    resetSelectedMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
