import { MutableRefObject, RefObject } from 'react';
import { Instance, SignalData } from 'simple-peer';

export interface IVideoContext {
    stream: MediaStream;
    isAccepted: boolean;
    callDetail: CallDetail;
    myVideoRef: RefObject<HTMLVideoElement>;
    userVideoRef: RefObject<HTMLVideoElement>;
    connectionRef: MutableRefObject<Instance | null>;
    receiverSocketID: string;
    callerDetail: CallerDetail;
    isEnded: boolean;
    setIsEnded: (isEnded: boolean) => void;
    setCallerDetail: (callerDetail: CallerDetail) => void;
    setCallDetail: (callDetail: CallDetail) => void;
    handleCallUserContext: () => void;
    handleSendCallerAndReceiverIDContext: ({
        receiverID,
        senderID,
    }: {
        receiverID: number;
        senderID: number;
    }) => void;
    handleAnswerCallContext: () => void;
    setIsAccepted: (value: boolean) => void;
    setStream: (stream: MediaStream) => void;
    handleEndCallContext: () => void;
}

export type CallerDetail = {
    socketID: string;
    name: string;
    avatar: string;
};

export type CallDetail = {
    isReceivedCall: boolean;
    callerDetail: CallerDetail;
    signalData: SignalData;
};
