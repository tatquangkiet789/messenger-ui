import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { useEffect } from 'react';
import { findAllMessages } from '../services/messageThunk';
import { toggleNewMessageList } from '../messageSlice';

type MessageHookParam = {
    page: number;
    receiverId: number;
    accessToken: string;
};

export default function useMessage({ page, receiverId, accessToken }: MessageHookParam) {
    const { messages, loading, hasNextPage, isNewList, error } = useAppSelector(
        (state) => state.messages,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!accessToken) return;

        dispatch(toggleNewMessageList(page === 1 ? true : false));
        dispatch(findAllMessages({ page, userId: receiverId, accessToken }));
    }, [accessToken, dispatch, page, receiverId]);

    return {
        messageList: messages,
        messageLoading: loading,
        messageHasNextPage: hasNextPage,
        messageNewList: isNewList,
        messageError: error,
    };
}
