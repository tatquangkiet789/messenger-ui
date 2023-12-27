import { memo } from 'react';
import { IFriend } from '../../models/friend';
import FriendItem from '../FriendItem/FriendItem';

type FriendListProps = {
    friendList: IFriend[];
    loading: boolean;
    error: string;
    hasNextPage: boolean;
    onChangePage: (page: any) => void;
};

const FriendList = memo(function FriendList({
    friendList,
    loading,
    error,
    hasNextPage,
    onChangePage,
}: FriendListProps) {
    return (
        <div className='flex flex-col'>
            {friendList.length === 0 && loading ? (
                <p className='px-[10px]'>Đang tải danh sách bạn bè</p>
            ) : friendList.length === 0 ? (
                <p className='px-[10px]'>Không tìm thấy danh sách bạn vè</p>
            ) : error ? (
                <p className='px-[10px]'>{error}</p>
            ) : (
                <>
                    {friendList.map((friend) => (
                        <FriendItem key={friend.id} friend={friend} />
                    ))}
                    <div></div>
                </>
            )}
        </div>
    );
});

export default FriendList;
