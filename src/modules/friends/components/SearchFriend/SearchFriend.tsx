import { MAX_INPUT_LENGTH } from '@src/constants/constants';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import useDebounce from '@src/hooks/useDebounce';
import Tippy from '@tippyjs/react';
import { FC, useEffect, useState } from 'react';
import { MdOutlinePersonAddAlt } from 'react-icons/md';

const SearchFriend: FC = () => {
    const [keyword, setKeyword] = useState('');
    const debouncedValue = useDebounce(keyword, 500);

    const dispatch = useAppDispatch();

    useEffect(() => {
        // if (!debouncedValue) {
        //     dispatch(resetFriendList());
        //     return;
        // }
        // dispatch(findFriendsByKeyword(debouncedValue));
    }, [debouncedValue, dispatch]);

    return (
        <div className='flex items-center justify-between gap-2'>
            <input
                className='bg-gray006 rounded-[92px] caret-primary py-3 px-5 text-base flex-1 border-gray012'
                type='text'
                placeholder='Tìm kiếm người dùng'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                maxLength={MAX_INPUT_LENGTH}
            />
            <Tippy content='Thêm bạn bè' placement='bottom'>
                <span className='flex items-center p-2 rounded-lg hover:cursor-pointer hover:bg-gray006'>
                    <MdOutlinePersonAddAlt size={25} />
                </span>
            </Tippy>
        </div>
    );
};

export default SearchFriend;
