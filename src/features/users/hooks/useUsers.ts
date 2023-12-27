import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import { useEffect } from 'react';
import { find10SuggestedUsers } from '../services/userThunk';
import useAuth from '@src/features/auth/hooks/useAuth';
import { removeCurrentUserInSuggestedUsers } from '../userSlice';

export default function useUsers() {
    const { isAuthenticated, currentUser } = useAuth();
    const { suggestedUsers } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(find10SuggestedUsers());
    }, [dispatch]);

    function isCurrentUserInSuggestedList() {
        return suggestedUsers.find((user) => user.id === currentUser.id);
    }

    function removeCurrentUserInSuggestdList() {
        if (!isAuthenticated) return;

        const existedCurrentUser = isCurrentUserInSuggestedList();
        if (!existedCurrentUser) return;

        dispatch(removeCurrentUserInSuggestedUsers(currentUser.id));
    }

    function getSuggestedUsers() {
        removeCurrentUserInSuggestdList();

        return suggestedUsers;
    }

    return { getSuggestedUsers };
}
