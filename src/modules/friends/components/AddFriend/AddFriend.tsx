import { FC, Fragment } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface IAddFriendProps {
    onToggleModal: (value: boolean) => void;
}
const AddFriend: FC<IAddFriendProps> = ({ onToggleModal }) => {
    const handleToggleModal = () => {
        onToggleModal(false);
    };

    return (
        <Fragment>
            <div className='flex items-center justify-between p-4'>
                <h3 className='text-lg font-medium'>Thêm bạn</h3>
                <span onClick={handleToggleModal} className='cursor-pointer'>
                    <AiOutlineClose size={20} />
                </span>
            </div>
        </Fragment>
    );
};

export default AddFriend;
