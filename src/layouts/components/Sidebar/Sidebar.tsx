import Modal from '@src/components/ui/Modal/Modal';
import { MAX_INPUT_LENGTH, STORAGE_KEY } from '@src/constants/constants';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import useDebounce from '@src/hooks/useDebounce';
import AddFriend from '@src/modules/friends/components/AddFriend/AddFriend';
import FriendList from '@src/modules/friends/components/FriendList/FriendList';
import { IFriend } from '@src/modules/friends/models/friend';
import { findAllFriends } from '@src/redux/reducers/friendSlice';
import Tippy from '@tippyjs/react';
import { FC, Fragment, useEffect, useState } from 'react';
import { MdOutlinePersonAddAlt } from 'react-icons/md';

const Sidebar: FC = () => {
    const {
        friends,
        loading: friendLoading,
        error: friendError,
    } = useAppSelector((state) => state.friends);
    const dispatch = useAppDispatch();
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;
    const [isOpenAddFriend, setIsOpenAddFriend] = useState(false);
    const [keyword, setKeyword] = useState('');
    const debouncedValue = useDebounce(keyword, 500);
    const filterList: IFriend[] = [...friends].filter(
        (friend) =>
            friend.firstName
                .toLowerCase()
                .trim()
                .includes(debouncedValue.toLowerCase().trim()) ||
            friend.lastName
                .toLowerCase()
                .trim()
                .includes(debouncedValue.toLowerCase().trim()),
    );

    useEffect(() => {
        if (!accessToken) return;
        dispatch(findAllFriends({ accessToken: accessToken, page: 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken]);

    return (
        <Fragment>
            <div className='bg-white rounded-lg flex flex-col w-[358px] shadow-lg'>
                <div className='flex items-center justify-between gap-2 p-[10px]'>
                    <input
                        className='bg-gray006 rounded-[92px] caret-primary py-3 px-5 
                    text-base flex-1 border-gray012'
                        type='text'
                        placeholder='Tìm kiếm người dùng'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        maxLength={MAX_INPUT_LENGTH}
                    />
                    <Tippy content='Thêm bạn bè' placement='bottom'>
                        <span
                            onClick={() => setIsOpenAddFriend(true)}
                            className='flex items-center p-2 rounded-lg hover:cursor-pointer 
                        hover:bg-gray006'
                        >
                            <MdOutlinePersonAddAlt size={25} />
                        </span>
                    </Tippy>
                </div>
                <div className='flex-1 overflow-y-scroll'>
                    <FriendList
                        friendList={filterList}
                        loading={friendLoading}
                        error={friendError}
                    />
                </div>
            </div>
            {isOpenAddFriend ? (
                <Modal onCloseModal={setIsOpenAddFriend}>
                    <AddFriend />
                </Modal>
            ) : null}
        </Fragment>
    );
};

export default Sidebar;
