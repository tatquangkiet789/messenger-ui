import Input from '@src/components/ui/Input';
import Button from '@src/components/ui/Button';
import { STORAGE_KEY } from '@src/constants/constants';
import { ChangeEvent, FC, useState } from 'react';
import { resetSearchResultList } from '@src/features/users/userSlice';
import { findAllUsersByKeyword } from '@src/features/users/services/userThunk';
import SearchUserList from '@src/features/users/components/SearchUserList/SearchUserList';
import { AiOutlineClose, AiOutlineLoading3Quarters, MdPersonSearch } from '@src/components/icons';
import { useAppDispatch, useAppSelector } from '@src/hooks/useRedux';

interface IAddFriendProps {
    onToggleModal: (value: boolean) => void;
}

const AddFriend: FC<IAddFriendProps> = ({ onToggleModal }) => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useAppDispatch();
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;
    const { searchResultList, loading: userLoading } = useAppSelector((state) => state.users);

    const handleToggleModal = () => {
        onToggleModal(false);
        dispatch(resetSearchResultList());
    };

    const handleOnChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleSearchUserByKeyord = () => {
        dispatch(findAllUsersByKeyword({ keyword, accessToken }));
    };

    return (
        <>
            <div className='flex items-center justify-between p-4 border-b-2 border-b-gray006'>
                <h3 className='text-lg font-medium'>Thêm bạn</h3>
                <span onClick={handleToggleModal} className='cursor-pointer'>
                    <AiOutlineClose size={20} />
                </span>
            </div>
            <div className='p-4'>
                <Input
                    inputType='text'
                    name='add-friend'
                    value={keyword}
                    onChangeValue={handleOnChangeValue}
                    placeholder='Tìm kiếm người dùng'
                />
            </div>
            <div className={`flex-1 overflow-y-auto`}>
                {userLoading ? (
                    <div className={`flex justify-center items-center p-3`}>
                        <AiOutlineLoading3Quarters className='animate-spin' size={25} />
                    </div>
                ) : (
                    <SearchUserList searchUserList={searchResultList} />
                )}
            </div>
            <div className={`self-end p-4`}>
                <Button
                    text='Tìm kiếm'
                    variant='primary'
                    size='md'
                    iconLeft={<MdPersonSearch size={20} />}
                    onClick={handleSearchUserByKeyord}
                />
            </div>
        </>
    );
};

export default AddFriend;
