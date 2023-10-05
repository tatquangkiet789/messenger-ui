import Input from '@src/components/form/Input/Input';
import Button from '@src/components/ui/Button/Button';
import { STORAGE_KEY } from '@src/constants/constants';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import { useAppSelector } from '@src/hooks/useAppSelector';
import { ChangeEvent, FC, Fragment, useState } from 'react';
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdPersonSearch } from 'react-icons/md';
import SearchFriendList from '../SearchFriendList/SearchFriendList';
import { findAllUsersByKeyword } from '../../services/friendThunk';
import { resetSearchResultList } from '../../friendSlice';

interface IAddFriendProps {
    onToggleModal: (value: boolean) => void;
}

const AddFriend: FC<IAddFriendProps> = ({ onToggleModal }) => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useAppDispatch();
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)!;
    const { searchResultList, loading: friendLoading } = useAppSelector((state) => state.friends);

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
        <Fragment>
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
                {friendLoading ? (
                    <div className={`flex justify-center items-center p-3`}>
                        <AiOutlineLoading3Quarters className='animate-spin' size={25} />
                    </div>
                ) : (
                    <SearchFriendList searchFriendList={searchResultList} />
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
        </Fragment>
    );
};

export default AddFriend;
