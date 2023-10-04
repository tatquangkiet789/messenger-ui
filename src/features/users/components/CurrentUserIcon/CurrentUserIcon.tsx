import Modal from '@src/components/ui/Modal/Modal';
import { ROUTES } from '@src/constants/routes';
import { IAuth } from '@src/features/auth/models/auth';
import { logout } from '@src/features/auth/services/authThunk';
import { useAppDispatch } from '@src/hooks/useAppDispatch';
import HeadlessTippy from '@tippyjs/react/headless';
import { AnimatePresence } from 'framer-motion';
import { FC, Fragment, useState } from 'react';
import { BiLogOutCircle } from 'react-icons/bi';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoLanguageOutline } from 'react-icons/io5';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../UserProfile/UserProfile';
import { resetReceiver } from '@src/features/friends/friendSlice';

interface ICurrentUserIconProps {
    currentUser: IAuth;
}

const CurrentUserIcon: FC<ICurrentUserIconProps> = ({ currentUser }) => {
    const [isOpenUserSetting, setIsOpenUserSetting] = useState(false);
    const [isOpenLanguage, setIsOpenLanguage] = useState(false);
    const [isOpenCurrentProfile, setIsOpenCurrentProfile] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setIsOpenUserSetting(false);
        setIsOpenLanguage(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetReceiver());
        return navigate(ROUTES.LOGIN);
    };

    return (
        <Fragment>
            <HeadlessTippy
                visible={isOpenUserSetting ? true : false}
                interactive
                placement='bottom-end'
                onClickOutside={handleCloseModal}
                render={(attrs) => (
                    <div
                        tabIndex={-1}
                        {...attrs}
                        className='bg-white_1 w-full flex flex-col overflow-y-auto rounded-lg 
                        shadow-md'
                    >
                        <div
                            className='w-full flex items-center justify-between py-[10px] px-4 
                            cursor-pointer'
                        >
                            <p className='text-base font-semibold'>Chế độ tối</p>
                            <label className='relative inline-flex items-center cursor-pointer'>
                                <input type='checkbox' value='' className='sr-only peer' />
                                <div
                                    className="w-10 h-5 bg-gray-200 peer-focus:outline-none 
                                    rounded-full peer peer-checked:after:translate-x-full 
                                    peer-checked:after:border-white after:content-[''] 
                                    after:absolute after:bg-white after:border-gray-300 
                                    after:border after:rounded-full after:h-5 after:w-5 
                                    after:transition-all peer-checked:bg-primary"
                                ></div>
                            </label>
                        </div>
                        <div
                            onClick={() => {
                                setIsOpenCurrentProfile(true);
                                handleCloseModal();
                            }}
                            className='w-full flex items-center justify-start py-[10px] px-4 
                            cursor-pointer hover:bg-gray012'
                        >
                            <span className='mr-2'>
                                <HiOutlineUserCircle size={20} />
                            </span>
                            <p className='text-base font-semibold'>Thông tin cá nhân</p>
                        </div>
                        <HeadlessTippy
                            visible={isOpenLanguage ? true : false}
                            interactive
                            placement='right-start'
                            onClickOutside={handleCloseModal}
                            render={(attrs) => (
                                <div
                                    tabIndex={-1}
                                    {...attrs}
                                    className='bg-white_1 flex flex-col rounded-lg shadow-md'
                                >
                                    <div
                                        className='w-full flex items-center justify-start py-[10px] 
                                    px-4 cursor-pointer hover:bg-gray012'
                                    >
                                        <p className='text-base font-semibold px-4'>Tiếng Việt</p>
                                    </div>
                                    <div
                                        className='w-full flex items-center justify-start py-[10px] 
                                    px-4 cursor-pointer hover:bg-gray012'
                                    >
                                        <p className='text-base font-semibold px-4'>Tiếng Anh</p>
                                    </div>
                                </div>
                            )}
                        >
                            <div
                                onClick={() => setIsOpenLanguage(true)}
                                className={`w-full flex items-center justify-start py-[10px] px-4 
                                cursor-pointer hover:bg-gray012 
                                ${isOpenLanguage ? 'bg-gray012' : ''}`}
                            >
                                <span className='mr-2 flex items-center'>
                                    <IoLanguageOutline size={20} />
                                </span>
                                <p className='text-base font-semibold'>Ngôn ngữ</p>
                                <span className='flex items-center ml-auto'>
                                    <MdKeyboardArrowRight size={20} />
                                </span>
                            </div>
                        </HeadlessTippy>
                        <div
                            onClick={handleLogout}
                            className='w-full flex items-center justify-start py-[10px] px-4 
                            cursor-pointer hover:bg-gray012'
                        >
                            <span className='mr-2'>
                                <BiLogOutCircle size={20} />
                            </span>
                            <p className='text-base font-semibold'>Đăng xuất</p>
                        </div>
                    </div>
                )}
            >
                <div
                    onClick={() => setIsOpenUserSetting(true)}
                    className={`w-8 h-8 ml-6 cursor-pointer bg-center bg-contain rounded-full 
                    bg-no-repeat `}
                    style={{
                        backgroundImage: `url(${currentUser.avatar})`,
                    }}
                ></div>
            </HeadlessTippy>
            <AnimatePresence>
                {isOpenCurrentProfile ? (
                    <Modal>
                        <UserProfile user={currentUser} onToggleModal={setIsOpenCurrentProfile} />
                    </Modal>
                ) : null}
            </AnimatePresence>
        </Fragment>
    );
};

export default CurrentUserIcon;
