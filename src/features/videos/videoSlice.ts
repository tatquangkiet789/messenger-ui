import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// type CALL_STATE = 'PENDING' | ''
type CallerDetail = {
    name: string;
    avatar: string;
};

type VideoState = {
    isReceivedCall: boolean;
    callFrom: string;
    signal: string;
    callerDetail: CallerDetail;
    isAccepted: boolean;
    receivedCallStocketID: string;
};

const initialState: VideoState = {
    isReceivedCall: false,
    callerDetail: null as any,
    callFrom: '',
    signal: '',
    isAccepted: false,
    receivedCallStocketID: '',
};

const videoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setReceivedCallSocketID: (state, action: PayloadAction<string>) => {
            state.receivedCallStocketID = action.payload;
        },
        setIsReceivedCall: (state, action: PayloadAction<boolean>) => {
            state.isReceivedCall = action.payload;
        },
        setCallerDetail: (state, action: PayloadAction<CallerDetail>) => {
            state.callerDetail = action.payload;
        },
    },
});

export const { setReceivedCallSocketID, setIsReceivedCall, setCallerDetail } = videoSlice.actions;

export default videoSlice.reducer;
