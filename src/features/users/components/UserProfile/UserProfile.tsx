import tickIcon from '@src/assets/icons/tick.svg';
import Button from '@src/components/ui/Button/Button';
import { IAuth, isInstanceOfIAuth } from '@src/features/auth/models/auth';
import { IFriend } from '@src/features/friends/models/friend';
import { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IUser } from '../../models/user';
import CurrentUserProfile from '../CurrentUserProfile/CurrentUserProfile';

interface IUserProfileProps {
    user: IUser | IAuth | IFriend;
    onToggleModal: (value: boolean) => void;
}

const UserProfile: FC<IUserProfileProps> = ({ user, onToggleModal }) => {
    const { firstName, lastName, avatar, tick } = user;

    const handleToggleModal = () => {
        onToggleModal(false);
    };

    return (
        <div style={{ scrollbarGutter: 'stable', overflow: 'auto' }}>
            <div className='flex items-center justify-between p-4'>
                <h3 className='text-lg font-medium'>Thông tin tài khoản</h3>
                <span onClick={handleToggleModal} className='cursor-pointer'>
                    <AiOutlineClose size={20} />
                </span>
            </div>
            <div
                className='w-20 h-20 mx-auto bg-no-repeat bg-cover bg-center rounded-full
                mt-4'
                style={{ backgroundImage: `url(${avatar})` }}
            ></div>
            <div className='flex items-center justify-center gap-2'>
                <h3 className='font-semibold my-3 text-base'>
                    {lastName} {firstName}
                </h3>
                {tick ? <img src={tickIcon} /> : null}
            </div>
            {isInstanceOfIAuth(user) ? (
                <CurrentUserProfile email={user.email} username={user.username} />
            ) : (
                <div className='flex items-center justify-between px-4 gap-4'>
                    <Button text='Gọi điện' size='lg' variant='primary' />
                    <Button
                        text='Nhắn tin'
                        size='lg'
                        variant='primary'
                        onClick={handleToggleModal}
                    />
                </div>
            )}
        </div>
    );
};

export default UserProfile;
