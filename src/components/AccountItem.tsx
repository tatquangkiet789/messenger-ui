import { tickIcon } from '@src/assets';
import { memo } from 'react';
import { Link } from 'react-router-dom';

type AccountItemProps = {
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
    isVerified: boolean;
};

const AccountItem = memo(function AccountItem({
    firstName,
    lastName,
    username,
    avatar,
    isVerified,
}: AccountItemProps) {
    return (
        <Link
            className='flex items-center cursor-pointer py-2 pr-[6px] pl-2 hover:bg-gray003'
            to={`/${username}`}
        >
            <img src={avatar} alt={`${lastName} ${firstName}`} className='w-9 h-9 rounded-full' />
            <div className='flex-1 ml-3'>
                <p className='flex items-center text-lg font-bold'>
                    {lastName} {firstName}
                    {isVerified ? (
                        <img className='ml-2' src={tickIcon} alt='isVerified Icon' />
                    ) : null}
                </p>
                <p className='text-gray05 text-base'>{username}</p>
            </div>
        </Link>
    );
});

export default AccountItem;
