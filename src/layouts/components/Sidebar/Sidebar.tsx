import { STORAGE_KEY } from '@src/constants/constants';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import FriendList from '@src/modules/friends/components/FriendList/FriendList';
import SearchFriend from '@src/modules/friends/components/SearchFriend/SearchFriend';
import { findAllFriends } from '@src/redux/reducers/friendSlice';
import { FC, useEffect } from 'react';

const Sidebar: FC = () => {
    const {
        friends,
        loading: friendLoading,
        error: friendError,
    } = useAppSelector((state) => state.friends);
    const dispatch = useAppDispatch();
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;

    useEffect(() => {
        if (!accessToken) return;

        dispatch(findAllFriends({ accessToken: accessToken, page: 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    return (
        <div className='bg-white rounded-lg flex flex-col w-[358px] shadow-lg'>
            <div className='p-[10px]'>
                <SearchFriend />
            </div>
            <div className='flex-1 overflow-y-scroll'>
                <FriendList
                    friendList={friends}
                    loading={friendLoading}
                    error={friendError}
                />
            </div>
        </div>
    );
};

export default Sidebar;
