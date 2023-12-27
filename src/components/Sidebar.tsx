import SuggestedUsers from '@src/features/users/components/SuggestedUsers';
import { Suspense } from 'react';
import AccountItemSkeleton from './AccountItemSkeleton';
import NavLinks from './NavLinks';
import useUsers from '@src/features/users/hooks/useUsers';
import Button from './ui/Button';
import useAuth from '@src/features/auth/hooks/useAuth';
import { ROUTES } from '@src/constants/routes';
import { Link } from 'react-router-dom';
import { tickIcon } from '@src/assets';

export default function Sidebar() {
    const { getSuggestedUsers } = useUsers();
    const { isAuthenticated, currentUser } = useAuth();

    return (
        <div
            className='fixed max-w-[358px] w-full h-[calc(100vh-60px)] pt-5 pl-2 pb-[26px] pr-[18px] 
            overflow-hidden hover:overflow-y-auto'
        >
            {isAuthenticated ? (
                <Link
                    to={`/${currentUser.username}`}
                    className={`flex items-center p-2 w-full ease-in-out duration-200 hover:bg-gray003 rounded-md`}
                >
                    <img
                        src={currentUser.avatar}
                        className={`w-8 h-8 rounded-full`}
                        alt='User Avatar'
                    />
                    <p className={`ml-2 text-lg font-bold`}>
                        {currentUser.lastName} {currentUser.firstName}
                    </p>
                    {currentUser.isVerified ? <img className='ml-[3px]' src={tickIcon} /> : null}
                </Link>
            ) : null}
            <NavLinks />
            {!isAuthenticated ? (
                <div className='pt-5 pb-[25px] ml-2 mt-[5px] border-y-[0.5px] border-y-gray012'>
                    <p className='text-base pb-5 text-gray05'>
                        Đăng nhập để follow các tác giả, thích video và xem bình luận
                    </p>
                    <Button text='Đăng nhập' variant='outlined' size='lg' to={ROUTES.LOGIN} />
                </div>
            ) : null}
            <Suspense fallback={<AccountItemSkeleton size={3} />}>
                <SuggestedUsers suggestedUsers={getSuggestedUsers()} />
            </Suspense>
        </div>
    );
}
