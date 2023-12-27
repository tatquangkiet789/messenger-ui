import tickIcon from '@src/assets/icons/tick.svg';
import { AiOutlineHome, HiOutlineUsers, MdOutlineOndemandVideo } from '@src/components/icons';
import { ROUTES } from '@src/constants/routes';
import { useAppSelector } from '@src/hooks/useRedux';
import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';

const PostSidebar: FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);

    return (
        <>
            <div
                className='bg-white rounded-lg flex flex-col w-[358px] fixed pt-5 pl-2 pb-6 
                overflow-hidden hover:overflow-x-hidden hover:overflow-y-auto h-[calc(100vh-60px)]'
            >
                {currentUser ? (
                    <Link
                        to={`/${currentUser.username}`}
                        className={`flex items-center p-2 w-full ease-in-out duration-200 
                        hover:bg-gray003 hover:rounded`}
                    >
                        <img
                            src={currentUser.avatar}
                            className={`w-8 h-8 rounded-full`}
                            alt='User Avatar'
                        />
                        <p className={`mx-2 font-bold text-lg`}>
                            {currentUser.lastName} {currentUser.firstName}
                        </p>
                        {currentUser.tick ? <img src={tickIcon} /> : null}
                    </Link>
                ) : null}
                <NavLink
                    to={ROUTES.POST}
                    className={(
                        nav,
                    ) => `flex items-center p-2 w-full ease-in-out duration-200 hover:rounded
                    hover:bg-gray003 ${nav.isActive ? 'text-primary' : ''}`}
                >
                    <span>
                        <AiOutlineHome size={30} />
                    </span>
                    <p className={`ml-2 text-lg font-bold`}>Dành cho bạn</p>
                </NavLink>
                <NavLink
                    to={ROUTES.FRIEND}
                    className={(
                        nav,
                    ) => `flex items-center p-2 w-full ease-in-out duration-200 hover:rounded
                    hover:bg-gray003 ${nav.isActive ? 'text-primary' : ''}`}
                >
                    <span>
                        <HiOutlineUsers size={30} />
                    </span>
                    <p className={`ml-2 text-lg font-bold`}>Bạn bè</p>
                </NavLink>
                <NavLink
                    to={ROUTES.WATCH}
                    className={(
                        nav,
                    ) => `flex items-center p-2 w-full ease-in-out duration-200 hover:rounded
                    hover:bg-gray003 ${nav.isActive ? 'text-primary' : ''}`}
                >
                    <span>
                        <MdOutlineOndemandVideo size={30} />
                    </span>
                    <p className={`ml-2 text-lg font-bold`}>Watch</p>
                </NavLink>
            </div>
        </>
    );
};

export default PostSidebar;
