import { MdOutlinePersonAddAlt } from '@src/components/icons';
import Modal from '@src/components/ui/Modal';
import { MAX_INPUT_LENGTH } from '@src/constants/constants';
import useAccessToken from '@src/features/auth/hooks/useAccessToken';
import AddFriend from '@src/features/friends/components/AddFriend/AddFriend';
import FriendList from '@src/features/friends/components/FriendList/FriendList';
import { toggleNewList } from '@src/features/friends/friendSlice';
import { IFriend } from '@src/features/friends/models/friend';
import { findAllFriends } from '@src/features/friends/services/friendThunk';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';
import useDebounce from '@src/hooks/useDebounce';
import Tippy from '@tippyjs/react';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Sidebar() {
    const {
        friends,
        loading: friendLoading,
        error: friendError,
        hasNextPage,
    } = useAppSelector((state) => state.friends);
    const dispatch = useAppDispatch();
    const { accessToken } = useAccessToken();
    const [isOpenAddFriend, setIsOpenAddFriend] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [friendPage, setFriendPage] = useState(1);
    const debouncedValue = useDebounce(keyword, 500);
    const filterList: IFriend[] = [...friends].filter(
        (friend) =>
            friend.firstName.toLowerCase().trim().includes(debouncedValue.toLowerCase().trim()) ||
            friend.lastName.toLowerCase().trim().includes(debouncedValue.toLowerCase().trim()),
    );

    useEffect(() => {
        if (!accessToken) return;

        dispatch(toggleNewList(friendPage === 1 ? true : false));
        dispatch(findAllFriends({ accessToken: accessToken, page: friendPage }));
    }, [accessToken, dispatch, friendPage]);

    return (
        <>
            <div className='bg-white rounded-lg flex flex-col w-[358px] shadow-lg'>
                <div className='flex items-center justify-between gap-2 p-[10px]'>
                    <input
                        className='bg-gray006 rounded-[92px] caret-primary py-3 px-5 
                        text-base flex-1 border-gray012'
                        type='text'
                        placeholder='Tìm kiếm bạn bè'
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
                <div className='flex-1 overflow-y-scroll' style={{ overflowAnchor: 'none' }}>
                    <FriendList
                        friendList={filterList}
                        loading={friendLoading}
                        error={friendError}
                        hasNextPage={hasNextPage}
                        onChangePage={setFriendPage}
                    />
                </div>
            </div>
            <AnimatePresence>
                {isOpenAddFriend ? (
                    <Modal>
                        <AddFriend onToggleModal={setIsOpenAddFriend} />
                    </Modal>
                ) : null}
            </AnimatePresence>
        </>
    );
}
